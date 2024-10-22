import ImageDialog from '@/app/(main)/@modal/(.)image/_components/image-dialog';

type ImageModalPageProps = {
  searchParams: Promise<{
    url: string;
  }>;
};

const ImageModalPage = async (props: ImageModalPageProps) => {
  const searchParams = await props.searchParams;

  const {
    url
  } = searchParams;

  return <ImageDialog url={url} />;
};

export default ImageModalPage;
