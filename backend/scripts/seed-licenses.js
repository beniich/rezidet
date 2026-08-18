const { PrismaClient } = require('@prisma/client');
const crypto = require('crypto');
const prisma = new PrismaClient();

function generateKey(plan) {
  const segments = [];
  for (let i = 0; i < 4; i++) {
    segments.push(crypto.randomBytes(2).toString('hex').toUpperCase());
  }
  return `CAFM-${plan}-${segments.join('-')}`;
}

async function main() {
  const count = parseInt(process.argv[2] || '20');
  const plan = process.argv[3] || 'PRO';
  
  console.log(`Génération de ${count} licences ${plan}...`);
  
  const planLimits = {
    PRO: { maxUsers: 25, maxAssets: 1000 },
    ENTERPRISE: { maxUsers: 999, maxAssets: 99999 },
    FREE: { maxUsers: 1, maxAssets: 5 }
  };
  
  const limits = planLimits[plan] || planLimits.PRO;
  const expiresAt = new Date();
  expiresAt.setFullYear(expiresAt.getFullYear() + 1);
  
  const licenses = [];
  for (let i = 0; i < count; i++) {
    const license = await prisma.licenseKey.create({
      data: {
        key: generateKey(plan),
        plan,
        maxUsers: limits.maxUsers,
        maxAssets: limits.maxAssets,
        durationDays: 365,
        expiresAt,
        status: 'AVAILABLE',
        generatedBy: 'seed-script',
        notes: 'Lot initial de production'
      }
    });
    licenses.push(license);
  }
  
  console.log(`\n${count} licences generees:\n`);
  licenses.forEach((l, i) => {
    console.log(`  ${(i + 1).toString().padStart(2, '0')}. ${l.key}`);
  });
  
  console.log(`\nDistribuez ces cles a vos clients.`);
}

main().catch(console.error).finally(() => prisma.$disconnect());
