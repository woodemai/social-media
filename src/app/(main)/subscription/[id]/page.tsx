import { Suspense } from 'react';

import {
  getSubscriptionInfo,
  SubscriptionMenu,
  type SubscriptionTabs,
} from '@/entities/subscription';
import { type RouteParams } from '@/shared/types';

const SubscriptionPage = async ({
  params,
  searchParams,
}: RouteParams<
  {
    id: string;
  },
  {
    tab: SubscriptionTabs;
  }
>) => {
  const { tab } = await searchParams;
  const { id } = await params;

  const subscriptionInfo = await getSubscriptionInfo(id);

  return (
    <Suspense fallback='Loading'>
      <div className='mt-8 flex h-full items-center justify-center'>
        <SubscriptionMenu
          tab={tab}
          subscriptionInfo={subscriptionInfo}
        />
      </div>
    </Suspense>
  );
};

export default SubscriptionPage;
