'use client';

import { signIn } from 'next-auth/react';
import { FaGithub } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';

import { DEFAULT_LOGIN_REDIRECT } from '@/config/routes';
import { Button } from '@/shared/ui/button';
import { YandexLogo } from '@/shared/ui/yandex-logo';

const onClick = (provider: 'google' | 'github' | 'yandex') => {
  void signIn(provider, {
    callbackUrl: DEFAULT_LOGIN_REDIRECT,
  });
};

export const Social = () => (
  <div className='flex w-full items-center gap-x-2'>
    <Button
      className='w-full'
      onClick={() => {
        onClick('google');
      }}
      size='lg'
      variant='outline'
    >
      <FcGoogle className='size-5' />
    </Button>
    <Button
      className='w-full'
      onClick={() => {
        onClick('github');
      }}
      size='lg'
      variant='outline'
    >
      <FaGithub className='size-5' />
    </Button>
    <Button
      className='w-full'
      onClick={() => {
        onClick('yandex');
      }}
      size='lg'
      variant='outline'
    >
      <YandexLogo className='size-5 rounded-full dark:bg-primary' />
    </Button>
  </div>
);
