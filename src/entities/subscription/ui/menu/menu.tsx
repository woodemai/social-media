import {
  type SubscriptionInfo,
  SubscriptionTabs,
} from '@/entities/subscription';
import { Tabs, TabsList, TabsTrigger } from '@/shared/ui/tabs';

import { SubscriptionMenuItem } from './menu-item';

type SubscriptionMenuProps = {
  tab?: SubscriptionTabs;
  subscriptionInfo: SubscriptionInfo;
  closeDialog?: () => void;
};

export const SubscriptionMenu = ({
  tab,
  subscriptionInfo: { subscribed, subscribers },
  closeDialog,
}: SubscriptionMenuProps) => (
  <Tabs defaultValue={tab}>
    <div className='flex items-end justify-between gap-x-2'>
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
