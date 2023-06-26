const prisma = require('./client');

async function testPrisma() {
    try {
      // Test the Prisma connection
      await prisma.$connect();
      console.log('Connected to the database.');
  
      // Perform a simple query
      const users = await prisma.user.findMany();
      console.log('Retrieved users:', users);
    } catch (error) {
      console.error('Error connecting to the database:', error);
    } finally {
      await prisma.$disconnect();
    }
  }
  
testPrisma();