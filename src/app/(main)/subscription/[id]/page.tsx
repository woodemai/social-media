import { Suspense } from 'react';

import {
  SubscriptionMenu,
  type SubscriptionTabs,
} from '@/entities/subscription';
import { RouteParams } from '@/shared/types';

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

  return (
    <Suspense fallback='Loading'>
      <div className='mt-8 flex h-full items-center justify-center'>
        <SubscriptionMenu
          tab={tab}
          id={id}
        />
      </div>
    </Suspense>
  );
};

export default SubscriptionPage;
