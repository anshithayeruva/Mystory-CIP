const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const users = await prisma.user.findMany({
    include: { facultyProfile: true }
  });
  console.log(users.filter(u => u.role === 'ADMIN').map(u => ({ email: u.email, hasFacultyProfile: !!u.facultyProfile })));
}
main().catch(console.error).finally(() => prisma.$disconnect());
