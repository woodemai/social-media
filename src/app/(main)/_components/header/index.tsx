import Image from 'next/image';
import { Link } from 'next-view-transitions';

import logo from '@/../public/icons/logo.png';
import { getFullCurrentUser } from '@/entities/user/data';
import { ThemeToggle } from '@/shared/ui/theme-toggle';

import { Notifications } from './notifications';
import { Search } from './search';
import { UserHeaderMenu } from './user-menu';

export const Header = async () => {
  const user = await getFullCurrentUser();

  return (
    <header className='sticky top-0 z-50 h-16 w-full bg-card/30 p-2 backdrop-blur-md'>
      <div className='mx-auto flex size-full max-w-7xl items-center justify-between'>
        <Link
          className='flex flex-row items-center gap-x-4'
          href='/'
        >
          <Image
            alt='Logo'
            className='rounded-full'
            height={32}
            src={logo}
            width={32}
          />
          <h5 className='font-bold'>DevSphere</h5>
        </Link>
        <nav className='flex h-full items-center justify-center gap-x-4'>
          <Search />
          <UserHeaderMenu user={user} />
          <Notifications />
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
};
