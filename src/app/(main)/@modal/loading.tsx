import { Loader2 } from 'lucide-react';

const Loading = () => (
  <div className='fixed flex h-screen w-screen items-center justify-center bg-black/50'>
    <Loader2 className='animate-spin' />
  </div>
);

export default Loading;
