import {
  getSubscriptionInfo,
  type SubscriptionTabs,
} from '@/entities/subscription';
import { SubscriptionMenuModal } from '@/entities/subscription/client';
import { type RouteParams } from '@/shared/types';

export const ModalWrapper = async ({
  params,
  searchParams,
}: RouteParams<{ id: string }, { tab: SubscriptionTabs }>) => {
  const { tab } = await searchParams;
  const { id } = await params;
  const subscriptionInfo = await getSubscriptionInfo(id);

  return (
    <SubscriptionMenuModal
      tab={tab}
      subscriptionInfo={subscriptionInfo}
    />
  );
};
