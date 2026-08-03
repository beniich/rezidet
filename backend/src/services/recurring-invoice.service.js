const prisma = require('../config/database');
const emailService = require('./email.service');
const fs = require('fs').promises;
const path = require('path');

class RecurringInvoiceService {

  /**
   * Génère toutes les factures du mois en cours pour les tenants actifs
   */
  async generateMonthlyInvoices() {
    const now = new Date();
    const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
    const monthEnd = new Date(now.getFullYear(), now.getMonth() + 1, 0);

    const subscriptions = await prisma.subscription.findMany({
      where: { status: 'active', plan: { not: 'FREE' } },
      include: { tenant: true }
    });

    const generated = [];

    for (const sub of subscriptions) {
      const existing = await prisma.recurringInvoice.findFirst({
        where: { tenantId: sub.tenantId, periodStart: monthStart }
      });
      if (existing) continue;

      const invoice = await this.generateInvoice(sub, monthStart, monthEnd);
      generated.push(invoice);
    }

    return generated;
  }

  /**
   * Génère une facture pour un abonnement donné
   */
  async generateInvoice(subscription, periodStart, periodEnd) {
    const count = await prisma.recurringInvoice.count();
    const invoiceNumber = `INV-${new Date().getFullYear()}-${String(count + 1).padStart(5, '0')}`;

    const planPrices = { PRO: 49, ENTERPRISE: 199 };
    const baseAmount = planPrices[subscription.plan] || 0;
    const taxRate = 20; // TVA FR par défaut
    const subtotal = baseAmount;
    const taxAmount = subtotal * (taxRate / 100);
    const totalAmount = subtotal + taxAmount;

    const lineItems = JSON.stringify([{
      label: `Abonnement ${subscription.plan}`,
      description: `Période ${periodStart.toLocaleDateString('fr-FR')} → ${periodEnd.toLocaleDateString('fr-FR')}`,
      quantity: 1,
      unitPrice: baseAmount,
      amount: baseAmount
    }]);

    const invoice = await prisma.recurringInvoice.create({
      data: {
        tenantId: subscription.tenantId,
        invoiceNumber,
        periodStart,
        periodEnd,
        billingDate: new Date(),
        baseAmount,
        subtotal,
        taxRate,
        taxAmount,
        totalAmount,
        lineItems,
        status: 'PENDING'
      }
    });

    // Générer PDF simple et enregistrer
    await this.savePDF(invoice);
    return invoice;
  }

  /**
   * Sauvegarder un PDF simple (texte pour l'instant)
   */
  async savePDF(invoice) {
    try {
      const dir = path.join(process.cwd(), 'uploads', 'invoices');
      await fs.mkdir(dir, { recursive: true });
      const content = `FACTURE ${invoice.invoiceNumber}\nMontant: ${invoice.totalAmount}€\nPériode: ${invoice.periodStart} - ${invoice.periodEnd}`;
      await fs.writeFile(path.join(dir, `${invoice.invoiceNumber}.txt`), content);
      await prisma.recurringInvoice.update({
        where: { id: invoice.id },
        data: { pdfUrl: `/uploads/invoices/${invoice.invoiceNumber}.txt` }
      });
    } catch (err) {
      console.error('PDF save error:', err);
    }
  }

  /**
   * Envoyer les rappels pour factures en retard (> 7j)
   */
  async sendReminders() {
    const overdueInvoices = await prisma.recurringInvoice.findMany({
      where: {
        status: 'PENDING',
        billingDate: { lt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) }
      }
    });

    for (const invoice of overdueInvoices) {
      await prisma.recurringInvoice.update({
        where: { id: invoice.id },
        data: {
          remindersSent: { increment: 1 },
          lastReminderAt: new Date(),
          status: invoice.remindersSent + 1 >= 3 ? 'OVERDUE' : 'PENDING'
        }
      });

      if (invoice.remindersSent + 1 >= 3) {
        await prisma.subscription.updateMany({
          where: { tenantId: invoice.tenantId },
          data: { status: 'PAST_DUE' }
        });
        console.log(`⚠️ Tenant ${invoice.tenantId} suspendu après 3 rappels`);
      }
    }

    return overdueInvoices.length;
  }

  /**
   * Marquer comme payée
   */
  async markAsPaid(invoiceId, paymentRef) {
    return prisma.recurringInvoice.update({
      where: { id: invoiceId },
      data: { status: 'PAID', paidAt: new Date(), paymentRef }
    });
  }

  /**
   * Lister les factures d'un tenant
   */
  async listForTenant(tenantId) {
    return prisma.recurringInvoice.findMany({
      where: { tenantId },
      orderBy: { createdAt: 'desc' }
    });
  }
}

module.exports = new RecurringInvoiceService();
