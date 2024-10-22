import ImageItem from './_components/image-item';

type SubscriptionModalPageProps = {
  searchParams: Promise<{
    url: string;
  }>;
};

const SubscriptionModalPage = async (props: SubscriptionModalPageProps) => {
  const searchParams = await props.searchParams;

  const {
    url
  } = searchParams;

  return (
    <div className='flex size-full items-center justify-center'>
      <ImageItem url={url} />
    </div>
  );
};

export default SubscriptionModalPage;
