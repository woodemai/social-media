import { Suspense } from 'react';

import {
  getSubscriptionInfo,
  type SubscriptionTabs,
  SubscriptionMenuModal,
} from '@/entities/subscription/';

type SubscriptionModalPageProps = {
  params: Promise<{
    id: string;
  }>;
  searchParams: Promise<{
    tab: SubscriptionTabs;
  }>;
};

const SubscriptionModalPage = async ({
  params,
  searchParams,
}: SubscriptionModalPageProps) => {
  const { tab } = await searchParams;
  const { id } = await params;

  const subscriptionInfo = await getSubscriptionInfo(id);

  return (
    <Suspense fallback='Loading'>
      <SubscriptionMenuModal
        tab={tab}
        subscriptionInfo={subscriptionInfo}
      />
    </Suspense>
  );
};

export default SubscriptionModalPage;
