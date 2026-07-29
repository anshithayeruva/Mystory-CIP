const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const course = await prisma.course.findFirst({
    where: { OR: [{ name: 'Mathematics' }, { code: 'C205' }] }
  });
  console.log("Found Course:", course);
}
main().catch(console.error).finally(() => prisma.$disconnect());
