import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  const dept = await prisma.department.findFirst();
  const prog = await prisma.program.findFirst();
  console.log("DEPT_ID:", dept?.id);
  console.log("PROG_ID:", prog?.id);
}
main().catch(console.error).finally(() => prisma.$disconnect());
