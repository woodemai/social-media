import { cn } from '@/shared/utils';

const Skeleton = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn('animate-pulse rounded-md bg-muted/50', className)}
    {...props}
  />
);

export { Skeleton };
