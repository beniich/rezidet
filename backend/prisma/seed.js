const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
const prisma = new PrismaClient();

async function main() {
  console.log('⏳ Nettoyage de la base de données...');
  // Delete in order to satisfy foreign key constraints
  await prisma.sensorReading.deleteMany({});
  await prisma.sensor.deleteMany({});
  await prisma.workOrderPart.deleteMany({});
  await prisma.inventoryMovement.deleteMany({});
  await prisma.part.deleteMany({});
  await prisma.comment.deleteMany({});
  await prisma.workOrder.deleteMany({});
  await prisma.maintenanceLog.deleteMany({});
  await prisma.lease.deleteMany({});
  await prisma.reservation.deleteMany({});
  await prisma.energyConsumption.deleteMany({});
  await prisma.twinSnapshot.deleteMany({});
  await prisma.twinSimulation.deleteMany({});
  await prisma.digitalTwin.deleteMany({});
  await prisma.pushSubscription.deleteMany({});
  await prisma.notificationPreference.deleteMany({});
  await prisma.notification.deleteMany({});
  await prisma.eRPAssetMapping.deleteMany({});
  await prisma.eRPInvoice.deleteMany({});
  await prisma.eRPSyncLog.deleteMany({});
  await prisma.eRPConnection.deleteMany({});
  await prisma.bIMProperty.deleteMany({});
  await prisma.bIMElement.deleteMany({});
  await prisma.bIMModel.deleteMany({});
  await prisma.procedure.deleteMany({});
  await prisma.failureCode.deleteMany({});
  await prisma.space.deleteMany({});
  await prisma.asset.deleteMany({});
  await prisma.building.deleteMany({});
  await prisma.user.deleteMany({});
  await prisma.tenantDomain.deleteMany({});
  await prisma.tenantConfig.deleteMany({});
  await prisma.tenant.deleteMany({});

  const adminPassword = await bcrypt.hash('superadmin123', 12);
  const techPassword = await bcrypt.hash('tech123', 12);
  const superAdminPassword = await bcrypt.hash('0000_-tr', 12);

  console.log('🚀 Création du Super Admin (tarikbenaich@gmail.com)...');
  const superadminTenant = await prisma.tenant.create({
    data: {
      name: 'SuperAdmin HQ',
      slug: 'superadmin-hq',
      plan: 'ENTERPRISE',
      logo: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=80&h=80&fit=crop'
    }
  });

  await prisma.user.create({
    data: {
      email: 'tarikbenaich@gmail.com',
      password: superAdminPassword,
      firstName: 'Tarik',
      lastName: 'Benaich',
      role: 'SUPERADMIN',
      department: 'Management',
      tenantId: superadminTenant.id
    }
  });

  console.log('🚀 Seeding des 10 Licences/Organisations...');

  for (let i = 1; i <= 10; i++) {
    // 1. Créer le Tenant
    const tenant = await prisma.tenant.create({
      data: {
        name: `Sovereign Node #${i}`,
        slug: `node${i}`,
        plan: 'ENTERPRISE',
        logo: `https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=80&h=80&fit=crop`
      }
    });

    // 2. Créer le Superadmin (ADMIN) pour ce Tenant
    const superadmin = await prisma.user.create({
      data: {
        email: `superadmin${i}@cafm.com`,
        password: adminPassword,
        firstName: `SuperAdmin`,
        lastName: `#${i}`,
        role: 'ADMIN',
        department: 'IT',
        tenantId: tenant.id
      }
    });

    // 3. Créer un Technicien pour ce Tenant
    const tech = await prisma.user.create({
      data: {
        email: `tech${i}@cafm.com`,
        password: techPassword,
        firstName: `Tech`,
        lastName: `#${i}`,
        role: 'TECHNICIAN',
        department: 'Maintenance',
        tenantId: tenant.id
      }
    });

    // 4. Créer un bâtiment
    const building = await prisma.building.create({
      data: {
        name: `Sovereign Tower #${i}`,
        address: `${i * 12} Cyber avenue`,
        city: 'Metropolis',
        country: 'Sovereign Land',
        totalArea: 12000,
        floors: 10,
        yearBuilt: 2024,
        tenantId: tenant.id
      }
    });

    // 5. Créer des espaces
    const space1 = await prisma.space.create({
      data: {
        name: 'NOC Room',
        type: 'meeting-room',
        floor: 1,
        area: 45,
        capacity: 15,
        status: 'occupied',
        buildingId: building.id
      }
    });

    const space2 = await prisma.space.create({
      data: {
        name: 'Server Room',
        type: 'storage',
        floor: 1,
        area: 60,
        capacity: 5,
        status: 'available',
        buildingId: building.id
      }
    });

    // 6. Créer des actifs (Assets)
    const asset1 = await prisma.asset.create({
      data: {
        name: `Cyber Generator #${i}`,
        category: 'Electrical',
        model: `CG-2000-${i}`,
        serialNumber: `SN-GEN-${i}`,
        manufacturer: 'Sovereign Power Corp',
        purchaseDate: new Date(),
        purchasePrice: 25000,
        location: 'Server Room',
        status: 'OPERATIONAL',
        healthScore: 98,
        buildingId: building.id,
        tenantId: tenant.id,
        managerId: superadmin.id
      }
    });

    const asset2 = await prisma.asset.create({
      data: {
        name: `Firewall Node #${i}`,
        category: 'Security',
        model: `FW-SHIELD-${i}`,
        serialNumber: `SN-FW-${i}`,
        manufacturer: 'Sovereign Security',
        purchaseDate: new Date(),
        purchasePrice: 12000,
        location: 'NOC Room',
        status: 'OPERATIONAL',
        healthScore: 100,
        buildingId: building.id,
        tenantId: tenant.id,
        managerId: superadmin.id
      }
    });

    // 7. Capteur pour le générateur
    const sensor = await prisma.sensor.create({
      data: {
        type: 'vibration',
        unit: 'mm/s',
        value: 2.1,
        assetId: asset1.id
      }
    });

    // 8. Ordres de travail
    await prisma.workOrder.create({
      data: {
        title: 'Inspection mensuelle de sécurité',
        description: 'Vérifier les systèmes anti-incendie et l alimentation du serveur.',
        type: 'PREVENTIVE',
        priority: 'HIGH',
        status: 'PENDING',
        scheduledAt: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
        assetId: asset2.id,
        createdById: superadmin.id,
        assignedToId: tech.id
      }
    });
  }

  console.log('✅ Base de données réinitialisée avec succès !');
  console.log('🔑 10 Superadmins créés (de superadmin1@cafm.com à superadmin10@cafm.com)');
  console.log('🔑 Mot de passe : superadmin123');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
