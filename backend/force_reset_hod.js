const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
const prisma = new PrismaClient();
async function main() {
  const email = 'naranitya@gmail.com';
  const pwd = 'Hod@123';
  
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    console.log("User not found: " + email);
    return;
  }
  
  const hash = await bcrypt.hash(pwd, 10);
  await prisma.user.update({
    where: { email },
    data: { passwordHash: hash }
  });
  console.log("Reset password for " + email + " to Hod@123");
}
main().catch(console.error).finally(() => prisma.$disconnect());
