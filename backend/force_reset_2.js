const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
const prisma = new PrismaClient();
async function main() {
  const email = 'anshithayeruva@gmail.com';
  const pwd = 'Student@123';
  const hash = await bcrypt.hash(pwd, 10);
  
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    console.log("User not found: " + email);
    return;
  }
  
  await prisma.user.update({
    where: { email },
    data: { passwordHash: hash }
  });
  console.log("Reset password for " + email + " to Student@123");
}
main().catch(console.error).finally(() => prisma.$disconnect());
