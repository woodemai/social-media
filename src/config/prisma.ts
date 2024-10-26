import { PrismaClient } from '@prisma/client/edge';
import { withAccelerate } from '@prisma/extension-accelerate';

import { env } from '@/env';

const globalForPrisma = global as unknown as {
  prisma: PrismaClient;
};
export const db = new PrismaClient().$extends(withAccelerate());

const IS_NODE_DEVELOPMENT = env.NODE_ENV === 'development';
const IS_VERCEL_DEVELOPMENT = env.NEXT_PUBLIC_VERCEL_ENV === 'development';

if (IS_NODE_DEVELOPMENT || IS_VERCEL_DEVELOPMENT) {
  globalForPrisma.prisma = db as unknown as PrismaClient;
}
