/// <reference types="node" />

import 'dotenv/config';        // ensure env vars are loaded FIRST
import { PrismaClient } from '@prisma/client';

(async () => {
  const prisma = new PrismaClient({ log: ['info','warn','error'] });
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