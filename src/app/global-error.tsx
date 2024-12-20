'use client';

import { Button } from '@/shared/ui/button';

const GlobalError = ({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) => (
  <html>
    <body className='flex h-dvh w-full flex-col items-center justify-center space-y-4 text-center'>
      <h2 className='text-3xl font-bold tracking-tight'>
        Произошла глобальная ошибка!
      </h2>
      <p>
        Не переживайте, скоро мы решим проблему, а пока можете повторить попытку
      </p>
      <Button
        onClick={() => {
          reset();
        }}
        variant='secondary'
      >
        Попробовать еще раз
      </Button>
      <p className='text-sx text-muted-foreground'>Ошибка: {error.message}</p>
    </body>
  </html>
);
export default GlobalError;
