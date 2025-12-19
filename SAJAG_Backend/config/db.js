const { PrismaClient } = require('@prisma/client');

const globalForPrisma = globalThis;

// Create Prisma client with error logging
const prisma = globalForPrisma.prisma ?? new PrismaClient({
  log: [
    { level: 'error', emit: 'stdout' },
    { level: 'warn', emit: 'stdout' },
    { level: 'info', emit: 'stdout' },
  ],
  datasources: {
    db: {
      url: process.env.DATABASE_URL,
    },
  },
});

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;
}

// Track connection state
let isConnected = false;

// Connect with retry logic
const connectWithRetry = async (retries = 5, delay = 3000) => {
  for (let i = 0; i < retries; i++) {
    try {
      console.log(`[DB] Connection attempt ${i + 1}...`);
      await prisma.$connect();
      isConnected = true;
      console.log('[DB] PostgreSQL Connected via Prisma');
      return true;
    } catch (error) {
      console.error(`[DB] Connection attempt ${i + 1} failed:`, error.message);
      isConnected = false;
      if (i < retries - 1) {
        console.log(`[DB] Retrying in ${delay / 1000} seconds...`);
        await new Promise(resolve => setTimeout(resolve, delay));
      }
    }
  }
  console.error('[DB] Failed to connect after multiple attempts');
  return false;
};

// Ensure connection before operations (lazy reconnect)
const ensureConnection = async () => {
  if (!isConnected) {
    console.log('[DB] Connection lost, attempting to reconnect...');
    return await connectWithRetry(3, 2000);
  }
  return true;
};

// Keep-alive ping every 4 minutes to prevent Neon from closing idle connections
const KEEP_ALIVE_INTERVAL = 4 * 60 * 1000; // 4 minutes
let keepAliveTimer = null;

const startKeepAlive = () => {
  if (keepAliveTimer) clearInterval(keepAliveTimer);
  
  keepAliveTimer = setInterval(async () => {
    try {
      console.log('[DB] Keep-alive ping...');
      await prisma.$queryRaw`SELECT 1`;
      console.log('[DB] Keep-alive ping successful');
    } catch (error) {
      console.error('[DB] Keep-alive ping failed:', error.message);
      isConnected = false;
      // Attempt to reconnect
      await connectWithRetry(3, 2000);
    }
  }, KEEP_ALIVE_INTERVAL);
  
  console.log(`[DB] Keep-alive started (every ${KEEP_ALIVE_INTERVAL / 1000}s)`);
};

// Initial connection
connectWithRetry().then((connected) => {
  if (connected) {
    startKeepAlive();
  }
});

// Graceful disconnect
async function handleDisconnect() {
  console.log('[DB] Shutting down...');
  if (keepAliveTimer) {
    clearInterval(keepAliveTimer);
    keepAliveTimer = null;
  }
  try {
    await prisma.$disconnect();
    isConnected = false;
    console.log('[DB] Disconnected successfully');
  } catch (e) {
    console.error('[DB] Error during disconnect:', e);
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

// Export prisma and helper
module.exports = prisma;
module.exports.ensureConnection = ensureConnection;

