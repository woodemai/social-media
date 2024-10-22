import { getSubscriptionInfo } from '@/entities/subscription/data';
import { type SubscriptionTabs } from '@/entities/subscription/types';
import { SubscriptionMenu } from '@/entities/subscription/ui/menu/menu';

type SubscriptionPageProps = {
  params: Promise<{
    id: string;
  }>;
  searchParams: Promise<{
    tab: SubscriptionTabs;
  }>;
};

const SubscriptionPage = async (props: SubscriptionPageProps) => {
  const searchParams = await props.searchParams;

  const {
    tab
  } = searchParams;

  const params = await props.params;

  const {
    id
  } = params;

  const subscriptionInfo = await getSubscriptionInfo(id);

  return (
    <div className='mt-8 flex h-full items-center justify-center'>
      <SubscriptionMenu
        tab={tab}
        subscriptionInfo={subscriptionInfo}
      />
    </div>
  );
};

export default SubscriptionPage;
