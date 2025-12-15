/// <reference types="node" />

import 'dotenv/config';        // ensure env vars are loaded FIRST
import { PrismaClient } from '../prisma/generated/client';

(async () => {
  const prisma = new PrismaClient({ log: ['info','warn','error'] }as any);
  try {
    await prisma.$connect();
    console.log('Prisma connected ✅');
  } catch (e) {
    console.error('Prisma connect failed:', e);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
})();