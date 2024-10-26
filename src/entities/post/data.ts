'use server';

import { PAGE_SIZE } from '@/config/next.constants.mjs';
import { db } from '@/config/prisma';
import { getCurrentUser } from '@/entities/user';

import { type FullPost } from './types';

const getAuthor = ({
  selectedUserId,
  currentUserId,
}: {
  selectedUserId?: string;
  currentUserId?: string;
}) => {
  if (selectedUserId) {
    return {
      id: selectedUserId,
    };
  }
  return {
    OR: [
      {
        subscribers: {
          some: {
            id: currentUserId,
          },
        },
      },
      {
        id: currentUserId,
      },
    ],
  };
};

interface getPostsProps {
  userId?: string;
  page?: number;
}

/**
 * If we are passing `userId` we will look for posts of user with this id.
 *
 * If not we will look for posts of users of current user subscriptions
 */
export const getPosts = async ({
  userId,
  page = 1,
}: getPostsProps): Promise<FullPost[]> => {
  const user = await getCurrentUser();

  return db.post.findMany({
    cacheStrategy: {
      ttl: 60 * 60,
      swr: 60
    },
    skip: (page - 1) * PAGE_SIZE,
    take: PAGE_SIZE,
    where: {
      author: getAuthor({ selectedUserId: userId, currentUserId: user.id }),
    },
    include: {
      comments: {
        select: {
          id: true,
          body: true,
          author: {
            select: {
              id: true,
              name: true,
              image: true,
            },
          },
        },
        take: PAGE_SIZE,
      },
      _count: {
        select: {
          likedUsers: true,
        },
      },
      likedUsers: {
        where: {
          id: user.id,
        },
        select: {
          id: true,
        },
      },
      author: {
        select: {
          name: true,
          image: true,
        },
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
  });
};
