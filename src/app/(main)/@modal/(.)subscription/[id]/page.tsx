import { type SubscriptionTabs } from '@/entities/subscription';
import { type RouteParams } from '@/shared/types';

import { ModalWrapper } from './_components/modal-wrapper';

const SubscriptionModalPage = (
  props: RouteParams<{ id: string }, { tab: SubscriptionTabs }>,
) => <ModalWrapper {...props} />;

export default SubscriptionModalPage;
