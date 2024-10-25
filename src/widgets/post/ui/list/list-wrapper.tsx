import { getPosts } from '@/entities/post';
import { getCurrentUser } from '@/entities/user/data';

import { ListClient } from './list-client';
import { NoPosts } from './no-posts';

type PostListProps = {
  userId?: string;
};

export const PostList = async ({ userId }: PostListProps) => {
  const posts = await getPosts({ userId, page: 1 });
  const currentUser = await getCurrentUser();

  if (!posts.length) {
    return <NoPosts />;
  }

  return (
    <ListClient
      currentUserId={currentUser.id}
      posts={posts}
      userId={userId}
    />
  );
};
