const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
const prisma = new PrismaClient();
async function main() {
  const pwd = 'Student@123';
  const hash = await bcrypt.hash(pwd, 10);
  await prisma.user.update({
    where: { email: 'mallarapuujwal9@gmail.com' },
    data: { passwordHash: hash }
  });
  const user = await prisma.user.findUnique({ where: { email: 'mallarapuujwal9@gmail.com' } });
  console.log("New Hash:", user.passwordHash);
  console.log("Match?", bcrypt.compareSync(pwd, user.passwordHash));
}
main().catch(console.error).finally(() => prisma.$disconnect());
