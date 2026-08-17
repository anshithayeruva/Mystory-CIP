const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
const prisma = new PrismaClient();
async function main() {
  const user = await prisma.user.findUnique({ where: { email: 'mallarapuujwal9@gmail.com' } });
  console.log("DB Hash:", user.passwordHash);
  console.log("Match Student@123?", bcrypt.compareSync('Student@123', user.passwordHash));
}
main().catch(console.error).finally(() => prisma.$disconnect());
