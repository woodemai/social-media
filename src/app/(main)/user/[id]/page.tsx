import { Suspense } from 'react';

import { getIsSubscribed } from '@/entities/subscription';
import { getCurrentUser, getUserById } from '@/entities/user';
import { type RouteParams } from '@/shared/types';
import { ListSkeleton, PostForm, PostList } from '@/widgets/post';
import { UserInfo, UserNotFound } from '@/widgets/user';

import { NoAccess } from './_components/no-access';

const UserPage = async ({ params }: RouteParams<{ id: string }, undefined>) => {
  const { id } = await params;

  const [ user, currentUser, isSubscribed ] = await Promise.all([
    getUserById(id),
    getCurrentUser(),
    getIsSubscribed(id),
  ]);
  const isOwner = currentUser.id === id;
  const isShowingPosts = isSubscribed || isOwner || !user?.isPrivate;

  if (!user) return <UserNotFound />;

  return (
    <>
      {user && (
        <UserInfo
          isOwner={isOwner}
          isSubscribed={isSubscribed}
          user={user}
        />
      )}
      {isOwner && <PostForm />}
      {isShowingPosts ? (
        <Suspense fallback={<ListSkeleton />}>
          <PostList userId={id} />
        </Suspense>
      ) : (
        <NoAccess />
      )}
    </>
  );
};

export default UserPage;
