import { PrismaClient, Role } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  const adminEmail = 'admin@mystory.edu';
  const defaultPassword = 'Admin@123';

  console.log('🌱 Starting database seeding...');

  // 1. Check if admin user already exists to prevent duplicate entries
  const existingAdmin = await prisma.user.findUnique({
    where: { email: adminEmail },
  });

  if (existingAdmin) {
    console.log(`ℹ️ Admin user already exists: ${adminEmail}. Skipping admin seeding.`);
    return;
  }

  // 2. Hash the default password using bcryptjs
  const salt = await bcrypt.genSalt(10);
  const passwordHash = await bcrypt.hash(defaultPassword, salt);

  // 3. Create User and AdminProfile in a transaction
  await prisma.$transaction(async (tx) => {
    const user = await tx.user.create({
      data: {
        email: adminEmail,
        passwordHash,
        role: Role.ADMIN,
        firstName: 'System',
        lastName: 'Administrator',
        phoneNumber: null,
        isActive: true,
      },
    });

    await tx.adminProfile.create({
      data: {
        userId: user.id,
      },
    });
  });

  console.log(`✅ Default admin created successfully:`);
  console.log(`   - Email: ${adminEmail}`);
  console.log(`   - Role: ADMIN`);
}

main()
  .catch((error) => {
    console.error('❌ Database seeding failed:', error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    console.log('🌱 Seeding process finished.');
  });
