import { Suspense } from 'react';

import { getIsSubscribed } from '@/entities/subscription';
import { getCurrentUser } from '@/entities/user';
import { getUserById } from '@/entities/user/data';
import { ListSkeleton, PostForm, PostList } from '@/widgets/post';
import { UserInfo, UserNotFound } from '@/widgets/user';

import { NoAccess } from './_components/no-access';

type UserPageProps = {
  params: Promise<{
    id: string;
  }>;
};

const UserPage = async (props: UserPageProps) => {
  const params = await props.params;

  const { id } = params;

  const [user, currentUser, isSubscribed] = await Promise.all([
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
