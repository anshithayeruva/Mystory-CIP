import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
prisma.studentProfile.findFirst().then(s => console.log('FIRST STUDENT ID:', s?.id)).finally(() => prisma.$disconnect());
