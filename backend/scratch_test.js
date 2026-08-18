const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log("Keys in prisma:");
  console.log(Object.keys(prisma).filter(k => !k.startsWith('_')));
  
  if (prisma.userPresence) {
    console.log("prisma.userPresence is defined!");
  } else {
    console.log("prisma.userPresence is UNDEFINED!");
  }
}

main().catch(console.error).finally(() => prisma.$disconnect());
