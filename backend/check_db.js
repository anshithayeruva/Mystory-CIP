const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
async function main() {
  const user = await prisma.user.findUnique({ where: { email: 'mallarapuujwal9@gmail.com' } });
  console.log("User:", user);
  if (user) {
    const profile = await prisma.studentProfile.findUnique({ where: { userId: user.id } });
    console.log("Student Profile:", profile);
  }
}
main().catch(console.error).finally(() => prisma.$disconnect());
