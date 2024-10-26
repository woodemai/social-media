import { Suspense } from 'react';

import { type WithChildren } from '@/shared/types';

const Loading = ({ children }: WithChildren<undefined>) => (
  <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>
);

export default Loading;
