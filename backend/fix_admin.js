const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
const p = new PrismaClient();

async function main() {
  // Check if user exists
  let user = await p.user.findUnique({ where: { email: 'tarikbenaich@gmail.com' } });
  console.log('User found:', user ? `id=${user.id}, role=${user.role}` : 'NULL');

  if (!user) {
    console.log('User not found — running seed...');
    return;
  }

  // Test password
  const valid = await bcrypt.compare('0000_-tr', user.password);
  console.log('Password valid:', valid);
  
  if (!valid) {
    // Reset password
    const hash = await bcrypt.hash('0000_-tr', 12);
    await p.user.update({ where: { id: user.id }, data: { password: hash } });
    console.log('Password reset to 0000_-tr');
  }
}

main().catch(console.error).finally(() => p.$disconnect());
