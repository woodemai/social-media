import { type RouteParams } from '@/shared/types';

import ImageItem from './_components/image-item';

const SubscriptionModalPage = async ({
  searchParams,
}: RouteParams<undefined, { url: string }>) => {
  const { url } = await searchParams;

  return (
    <div className='flex size-full items-center justify-center'>
      <ImageItem url={url} />
    </div>
  );
};

export default SubscriptionModalPage;
