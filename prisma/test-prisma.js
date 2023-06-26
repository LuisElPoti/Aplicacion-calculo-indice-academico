const prisma = require('./client');

async function testPrisma() {
    try {
      // Test the Prisma connection
      await prisma.$connect();
      console.log('Connected to the database.');
    } catch (error) {
      console.error('Error connecting to the database:', error);
    } finally {
      await prisma.$disconnect();
    }
  }
  
testPrisma();