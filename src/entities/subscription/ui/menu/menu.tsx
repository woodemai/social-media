import { Link } from 'next-view-transitions';

import {
  type SubscriptionInfo,
  SubscriptionTabs,
} from '@/entities/subscription';
import { Button } from '@/shared/ui/button';
import { Tabs, TabsList, TabsTrigger } from '@/shared/ui/tabs';

import { SubscriptionMenuItem } from './menu-item';

type SubscriptionMenuProps = {
  tab?: SubscriptionTabs;
  subscriptionInfo: SubscriptionInfo;
  closeDialog?: () => void;
};

export const SubscriptionMenu = ({
  tab,
  subscriptionInfo: { name, subscribed, subscribers, id },
  closeDialog,
}: SubscriptionMenuProps) => (
  <Tabs defaultValue={tab}>
    <div className='flex items-end justify-between gap-x-2'>
      <div className='flex max-w-fit items-center gap-x-2 rounded-md bg-card px-4'>
        <span className='whitespace-nowrap'>Информация о</span>
        <Button
          asChild
          variant='link'
          className='p-0 font-bold'
        >
          <Link href={`/user/${id}`}>{name}</Link>
        </Button>
      </div>
      <TabsList>
        <TabsTrigger value={SubscriptionTabs.SUBSCRIBED}>Подписки</TabsTrigger>
        <TabsTrigger value={SubscriptionTabs.SUBSCRIBERS}>
          Подписчики
        </TabsTrigger>
      </TabsList>
    </div>
    <SubscriptionMenuItem
      closeDialog={closeDialog}
      users={subscribed}
      value={SubscriptionTabs.SUBSCRIBED}
    />
    <SubscriptionMenuItem
      closeDialog={closeDialog}
      users={subscribers}
      value={SubscriptionTabs.SUBSCRIBERS}
    />
  </Tabs>
);
