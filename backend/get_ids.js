const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const dept = await prisma.department.findFirst();
  const prog = await prisma.program.findFirst();
  console.log("DEPT_ID:", dept?.id, dept?.name);
  console.log("PROG_ID:", prog?.id, prog?.name);
}
main().catch(console.error).finally(() => prisma.$disconnect());
