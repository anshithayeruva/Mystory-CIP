import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();
async function main() {
  const email = 'mallarapuujwal9@gmail.com';
  const newPassword = 'Student@123';
  const hash = await bcrypt.hash(newPassword, 10);
  
  const user = await prisma.user.update({
    where: { email },
    data: {
      passwordHash: hash
    }
  });

  console.log(`Password for ${email} has been manually reset to: ${newPassword}`);
}

main().catch(e => {
  console.error('Error:', e.message);
  process.exit(1);
}).finally(() => prisma.$disconnect());
