'use client';

import { useRouter } from 'next/navigation';
import { Link } from 'next-view-transitions';
import { useState } from 'react';

import {
  type SubscriptionInfo,
  type SubscriptionTabs,
} from '@/entities/subscription';
import { Button } from '@/shared/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/shared/ui/dialog';

import { SubscriptionMenu } from './menu';

type SubscriptionMenuProps = {
  tab?: SubscriptionTabs;
  subscriptionInfo: SubscriptionInfo;
};

export const SubscriptionMenuModal = ({
  tab,
  subscriptionInfo,
}: SubscriptionMenuProps) => {
  const [ open, setOpen ] = useState(true);
  const router = useRouter();

  const handleOpen = () => {
    if (open) {
      setOpen(false);
      router.back();
    } else {
      setOpen(true);
    }
  };

  return (
    <Dialog
      defaultOpen
      open={open}
      onOpenChange={handleOpen}
    >
      <DialogContent className='border-none bg-transparent shadow-none'>
        <DialogHeader>
          <DialogTitle>
            {'Информация о '}
            <Button
              asChild
              variant='link'
              size='lg'
              className='p-0 text-lg font-semibold'
            >
              <Link href={`/user/${subscriptionInfo.id}`}>
                {subscriptionInfo.name}
              </Link>
            </Button>
          </DialogTitle>
          <DialogDescription>
            Нажмите на пользователя, чтобы просмотреть информацию о нем
          </DialogDescription>
        </DialogHeader>
        <SubscriptionMenu
          subscriptionInfo={subscriptionInfo}
          closeDialog={handleOpen}
          tab={tab}
        />
      </DialogContent>
    </Dialog>
  );
};
