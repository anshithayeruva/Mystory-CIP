const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const users = await prisma.user.findMany({
    include: { facultyProfile: true }
  });
  console.log("Users:", users.map(u => ({ id: u.id, email: u.email, role: u.role, hasFacultyProfile: !!u.facultyProfile })));
}
main().catch(console.error).finally(() => prisma.$disconnect());
