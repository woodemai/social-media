import { PrismaClient } from '@prisma/client/edge';
import { withAccelerate } from '@prisma/extension-accelerate';

import { env } from '@/env';

const prismaClientSingleton = () => {
  return new PrismaClient().$extends(withAccelerate());
};

declare const globalThis: {
  prismaGlobal: ReturnType<typeof prismaClientSingleton>;
} & typeof global;


export const db =globalThis.prismaGlobal || new PrismaClient().$extends(withAccelerate());

const IS_NODE_DEVELOPMENT = env.NODE_ENV === 'development';
const IS_VERCEL_DEVELOPMENT = env.NEXT_PUBLIC_VERCEL_ENV === 'development';

if (IS_NODE_DEVELOPMENT || IS_VERCEL_DEVELOPMENT) {
  globalThis.prismaGlobal = db;
}
