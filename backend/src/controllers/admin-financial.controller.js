const financialSvc = require('../services/analytics/financial.service');

exports.getDashboard = async (req, res) => {
  try { res.json(await financialSvc.getDashboard()); }
  catch (err) { res.status(500).json({ error: err.message }); }
};

exports.getMRRHistory = async (req, res) => {
  try { res.json(await financialSvc.getMRRHistory()); }
  catch (err) { res.status(500).json({ error: err.message }); }
};

exports.getCohorts = async (req, res) => {
  // Simplified cohort stub – full implementation via cron-saved data
  try {
    const metrics = await require('../config/database').financialMetric.findMany({
      orderBy: { date: 'desc' }, take: 6
    });
    res.json(metrics.map(m => ({
      date: m.date,
      cohortData: m.cohortData ? JSON.parse(m.cohortData) : {}
    })));
  } catch (err) { res.status(500).json({ error: err.message }); }
};

exports.getInvoices = async (req, res) => {
  try {
    const invoices = await require('../config/database').recurringInvoice.findMany({
      orderBy: { createdAt: 'desc' }, take: 100
    });
    res.json(invoices);
  } catch (err) { res.status(500).json({ error: err.message }); }
};

exports.markInvoicePaid = async (req, res) => {
  try {
    const svc = require('../services/recurring-invoice.service');
    const invoice = await svc.markAsPaid(req.params.id, req.body.paymentRef);
    res.json(invoice);
  } catch (err) { res.status(500).json({ error: err.message }); }
};

exports.triggerInvoiceGeneration = async (req, res) => {
  try {
    const svc = require('../services/recurring-invoice.service');
    const invoices = await svc.generateMonthlyInvoices();
    res.json({ generated: invoices.length, invoices });
  } catch (err) { res.status(500).json({ error: err.message }); }
};
