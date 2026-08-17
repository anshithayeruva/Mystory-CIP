import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();
async function main() {
  const hash = await bcrypt.hash('Admin@12345', 10);
  
  // Try to find the user first
  const existingUser = await prisma.user.findUnique({
    where: { email: 'admin@mystory.edu' }
  });

  if (existingUser) {
    // Update the password of the existing user
    await prisma.user.update({
      where: { email: 'admin@mystory.edu' },
      data: {
        passwordHash: hash,
        mustChangePassword: false, // ensure they can log right in
        role: 'ADMIN' // ensure they have admin privileges
      }
    });
    console.log('Existing admin account updated successfully!');
  } else {
    // Create it if it doesn't exist (fallback)
    await prisma.user.create({
      data: {
        email: 'admin@mystory.edu',
        passwordHash: hash,
        firstName: 'Super',
        lastName: 'Admin',
        role: 'ADMIN',
        mustChangePassword: false,
        isActive: true,
      },
    });
    console.log('Admin account created successfully!');
  }
  
  console.log('You can now log in with admin@mystory.edu / Admin@12345');
}
main().catch(e => {
  console.error(e);
  process.exit(1);
}).finally(() => prisma.$disconnect());
