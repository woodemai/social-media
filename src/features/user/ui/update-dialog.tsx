'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { DialogTitle } from '@radix-ui/react-dialog';
import { useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { type z } from 'zod';

import { useStore } from '@/config/store';
import { updateSchema, updateProfileAction } from '@/entities/user';
import { Button } from '@/shared/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
} from '@/shared/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/shared/ui/form';
import { FormError } from '@/shared/ui/form-error';
import { Input } from '@/shared/ui/input';
import { Switch } from '@/shared/ui/switch';
import { useToast } from '@/shared/ui/use-toast';

export const UpdateDialog = () => {
  const { user, updateUser } = useStore(state => state.userSlice);
  const [ error, setError ] = useState<string | undefined>();
  const [ open, setOpen ] = useState(false);
  const [ isPending, startTransition ] = useTransition();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof updateSchema>>({
    resolver: zodResolver(updateSchema),
    defaultValues: {
      name: user?.name ?? '',
      bio: user?.bio ?? '',
      password: '',
      isPrivate: user?.isPrivate ?? false,
    },
  });

  if (!user) return null;

  const { id } = user;

  const onSubmit = (values: z.infer<typeof updateSchema>) => {
    setError(undefined);
    updateUser(values);
    startTransition(async () => {
      const { error, name, bio, isPrivate } = await updateProfileAction(
        id,
        values,
      );
      setError(error);
      if (name && bio && isPrivate) {
        setOpen(false);
        updateUser(values);
        toast({
          title: 'Успех',
          description: 'Данные сохранены',
        });
      }
    });
  };

  return (
    <Dialog
      onOpenChange={isOpen => {
        setOpen(isOpen);
      }}
      open={open}
    >
      <DialogTrigger asChild>
        <Button
          disabled={isPending}
          variant='secondary'
        >
          Изменить
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className='font-bold'>Обновление профиля</DialogTitle>
          <DialogDescription>Настройте профиль под себя</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            className='w-full space-y-4'
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <FormField
              control={form.control}
              name='name'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Имя</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder='Введите новое имя'
                      autoComplete='name'
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='bio'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>О себе</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder='Расскажите немного о себе'
                      autoComplete='bio'
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='password'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Пароль</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder='Придумайте надежный пароль'
                      type='password'
                      autoComplete='password'
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='isPrivate'
              render={({ field }) => (
                <FormItem className='flex items-center space-x-2'>
                  <FormLabel className='pt-1'>Приватный профиль</FormLabel>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormError message={error} />
            <DialogFooter className='flex justify-end'>
              <Button
                className='ml-auto'
                disabled={isPending}
                type='submit'
              >
                Обновить
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
