import Image from 'next/image';

export const YandexLogo = ({ className }: { className: string }) => (
  <Image
    alt='yandex logo'
    className={className}
    height={32}
    src='/icons/yandex.svg'
    width={32}
  />
);
