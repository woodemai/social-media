import { type RouteParams } from '@/shared/types';

import ImageDialog from './_components/image-dialog';

const ImageModalPage = async ({
  searchParams,
}: RouteParams<undefined, { url: string }>) => {
  const { url } = await searchParams;

  return <ImageDialog url={url} />;
};

export default ImageModalPage;
