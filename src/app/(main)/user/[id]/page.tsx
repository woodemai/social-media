import { Suspense } from 'react';

import { getIsSubscribed } from '@/entities/subscription';
import { getCurrentUser } from '@/entities/user';
import { getUserById } from '@/entities/user/data';
import { ListSkeleton, PostForm, PostList } from '@/widgets/post';
import { UserInfo, UserNotFound } from '@/widgets/user';

type UserPageProps = {
  params: Promise<{
    id: string;
  }>;
};

const UserPage = async (props: UserPageProps) => {
  const params = await props.params;

  const {
    id
  } = params;

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
      {isOwner ? <PostForm /> : null}
      {isShowingPosts ? (
        <Suspense fallback={<ListSkeleton />}>
          <PostList userId={id} />
        </Suspense>
      ) : (
        <div className='flex flex-col items-center justify-center gap-y-4 text-center text-primary'>
          <span className='text-3xl'>🔒</span>
          <h1 className='text-3xl font-bold tracking-tight'>
            Приватный профиль
          </h1>
          <p className='text-muted-foreground'>
            Подпишитесь чтобы смотреть посты
          </p>
        </div>
      )}
    </>
  );
};

export default UserPage;
