'use client';

import { Header } from '@/entities/auth';
import { Social, BackButton } from '@/entities/auth/client';
import { Card, CardContent, CardFooter, CardHeader } from '@/shared/ui/card';

type CardWrapperProps = {
  children: React.ReactNode;
  headerLabel: string;
  backButtonLabel: string;
  backButtonHref: string;
  showSocial?: boolean;
};

export const CardWrapper = ({
  children,
  headerLabel,
  backButtonLabel,
  backButtonHref,
  showSocial,
}: CardWrapperProps) => (
  <Card className='w-[400px] shadow-md'>
    <CardHeader>
      <Header label={headerLabel} />
    </CardHeader>
    <CardContent>{children}</CardContent>
    {showSocial && (
      <CardFooter>
        <Social />
      </CardFooter>
    )}
    <CardFooter>
      <BackButton
        href={backButtonHref}
        label={backButtonLabel}
      />
    </CardFooter>
  </Card>
);
