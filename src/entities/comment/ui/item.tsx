'use client';

import { useState } from 'react';

import { type FullComment } from '@/entities/comment';
import { useCurrentUser } from '@/entities/user';
import { ProfileLink } from '@/features/user/ui/profile-link';

import { ActionsMenu } from './action-menu';
import { CommentEditForm } from './edit-form';

type CommentItemProps = {
  postId: string;
  comment: FullComment;
};

export const CommentItem = ({
  comment: { author, body, id },
  postId,
}: CommentItemProps) => {
  const user = useCurrentUser();
  const [isEditing, setIsEditing] = useState(false);

  const isOwner = user?.id === author.id;
  //TODO: Add edit options
  return (
    <div className='group/comment flex items-start justify-between gap-x-2 overflow-hidden'>
      {isEditing ? (
        <CommentEditForm
          postId={postId}
          commentId={id}
          defaultValues={{ body }}
          stopEditing={() => setIsEditing(false)}
        />
      ) : (
        <>
          <div className='flex flex-col gap-y-1 overflow-hidden'>
            <ProfileLink
              userId={author.id}
              userName={author.name}
              imageUrl={author.image}
            />
            <div className='ml-8 break-words'>{body}</div>
          </div>
          {isOwner && (
            <ActionsMenu
              startEditing={() => setIsEditing(true)}
              postId={postId}
              commentId={id}
            />
          )}
        </>
      )}
    </div>
  );
};
