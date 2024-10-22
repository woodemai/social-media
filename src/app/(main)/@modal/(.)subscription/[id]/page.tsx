import { getSubscriptionInfo } from '@/entities/subscription/data';
import { type SubscriptionTabs } from '@/entities/subscription/types';
import { SubscriptionMenuModal } from '@/entities/subscription/ui/menu/modal';

type SubscriptionModalPageProps = {
  params: Promise<{
    id: string;
  }>;
  searchParams: Promise<{
    tab: SubscriptionTabs;
  }>;
};

const SubscriptionModalPage = async (props: SubscriptionModalPageProps) => {
  const searchParams = await props.searchParams;

  const { tab } = searchParams;

  const params = await props.params;

  const { id } = params;

  const subscriptionInfo = await getSubscriptionInfo(id);

  return (
    <SubscriptionMenuModal
      tab={tab}
      subscriptionInfo={subscriptionInfo}
    />
  );
};

export default SubscriptionModalPage;
