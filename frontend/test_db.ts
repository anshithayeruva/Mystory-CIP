import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  try {
    await prisma.$connect();
    console.log('Successfully connected to MongoDB');
    
    // Optionally check if we can fetch counts
    const count = await prisma.user.count();
    console.log(`Found ${count} users in the database.`);
    
  } catch (e) {
    console.error('Failed to connect to MongoDB:', e);
  } finally {
    await prisma.$disconnect();
  }
}

main();
