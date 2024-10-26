'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { PaperPlaneIcon } from '@radix-ui/react-icons';
import { useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { type z } from 'zod';

import { useStore } from '@/config/store';
import { createCommentAction, commentSchema } from '@/entities/comment';
import { useCurrentUser } from '@/entities/user/client';
import { UserAvatar } from '@/features/user';
import { Button } from '@/shared/ui/button';
import { Form, FormControl, FormField, FormItem } from '@/shared/ui/form';
import { Input } from '@/shared/ui/input';
import { useToast } from '@/shared/ui/use-toast';

export const CommentForm = ({ postId }: { postId: string }) => {
  const user = useCurrentUser();
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();
  const { addComment } = useStore(state => state.postSlice);

  const form = useForm<z.infer<typeof commentSchema>>({
    resolver: zodResolver(commentSchema),
    defaultValues: {
      body: '',
    },
  });

  const onSubmit = (values: z.infer<typeof commentSchema>) => {
    startTransition(async () => {
      const createdComment = await createCommentAction(values, postId);
      toast({
        title: 'Комментарий',
        description: 'Комментарий отправлен',
        variant: 'success',
      });
      addComment(postId, createdComment);
      form.reset();
    });
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='flex items-center gap-x-4'
      >
        <UserAvatar src={user?.image} />
        <FormField
          name='body'
          control={form.control}
          render={({ field }) => (
            <FormItem className='w-full'>
              <FormControl>
                <Input
                  disabled={isPending}
                  placeholder='Комментарий...'
                  className='bg-card/50'
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <Button
          variant='ghost'
          size='icon'
          type='submit'
          disabled={isPending}
          title='Отправить комментарий'
          aria-label='Отправить комментарий'
          name='Отправить комментарий'
          className='rounded-full'
        >
          <PaperPlaneIcon className='size-4' />
        </Button>
      </form>
    </Form>
  );
};
