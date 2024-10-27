import { type FullComment } from '@/entities/comment';

import { CommentItem } from './item';

type CommentListProps = {
  postId: string;
  comments: FullComment[];
};

export const CommentList = ({ comments, postId }: CommentListProps) => (
  <ul className='space-y-4'>
    {comments.map(comment => (
      <li key={comment.id}>
        <CommentItem
          postId={postId}
          comment={comment}
        />
      </li>
    ))}
  </ul>
);
