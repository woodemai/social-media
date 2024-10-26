'use server';
import { type User } from '@prisma/client';
import { type User as AuthUser } from 'next-auth';
import { cache } from 'react';

import { auth } from '@/auth';
import { db } from '@/config/prisma';

import { type FullUser } from './types';

export const getCurrentUser = cache(async (): Promise<AuthUser> => {
  const session = await auth();
  if (!session?.user) {
    throw new Error('Not authenticated');
  }
  return session.user;
});

export const getFullCurrentUser = cache(async (): Promise<User> => {
  const { id } = await getCurrentUser();
  const user = await db.user.findUnique({
    where: {
      id,
    },
  });

  if (!user) {
    throw new Error('User not found');
  }

  return user;
});

export const getUserById = cache(
  async (id: string): Promise<FullUser | null> => {
    return await db.user.findUnique({
      where: { id },
      cacheStrategy: {
        ttl: 60 * 60,
        swr: 60,
      },
      include: {
        _count: {
          select: {
            subscribed: true,
            subscribers: true,
          },
        },
      },
    });
  },
);

export const getUserByEmail = async (email: string) => {
  try {
    return await db.user.findUnique({ where: { email } });
  } catch {
    return;
  }
};
