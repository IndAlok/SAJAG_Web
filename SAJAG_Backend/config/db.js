const { PrismaClient } = require('@prisma/client');

const globalForPrisma = globalThis;

const prisma = globalForPrisma.prisma ?? new PrismaClient({
  log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
  datasources: {
    db: {
      url: process.env.DATABASE_URL,
    },
  },
});

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;
}

const connectWithRetry = async (retries = 5, delay = 3000) => {
  for (let i = 0; i < retries; i++) {
    try {
      await prisma.$connect();
      console.log('PostgreSQL Connected via Prisma');
      return;
    } catch (error) {
      console.error(`Database connection attempt ${i + 1} failed: ${error.message}`);
      if (i < retries - 1) {
        console.log(`Retrying in ${delay / 1000} seconds...`);
        await new Promise(resolve => setTimeout(resolve, delay));
      }
    }
  }
  console.error('Failed to connect to database after multiple attempts');
};

connectWithRetry();

async function handleDisconnect() {
  try {
    await prisma.$disconnect();
  } catch (e) {
    console.error('Error during disconnect:', e);
  }
}

process.on('beforeExit', handleDisconnect);
process.on('SIGINT', async () => {
  await handleDisconnect();
  process.exit(0);
});
process.on('SIGTERM', async () => {
  await handleDisconnect();
  process.exit(0);
});

module.exports = prisma;

