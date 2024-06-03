'use client';

import { User } from '@prisma/client';
import {
  MagnifyingGlassIcon,
  SymbolIcon,
} from '@radix-ui/react-icons';
import debounce from 'debounce';
import { Link } from 'next-view-transitions';
import { ChangeEvent, useState, useTransition } from 'react';

import { getUsers } from '@/actions/user';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { UserAvatar } from '@/components/user/avatar';
import { cn } from '@/src/lib/utils';

export const Search = () => {
  const [searchValue, setSearchValue] = useState('');
  const [suggestions, setSuggestions] = useState<User[]>([]);
  const [isPending, startTransition] = useTransition();

  const updateSuggestions = debounce((value: string) => {
    if (!value.length) return;
    startTransition(() => {
      getUsers(value).then(res => {
        setSuggestions(res);
      });
    });
  }, 500);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
    if (!e.target.value) {
      setSuggestions([]);
    } else {
      updateSuggestions(e.target.value);
    }
  };

  return (
    <Dialog>
      <DialogTrigger className='bg-muted/60 rounded-md py-2 px-4 text-sm text-muted-foreground flex gap-x-2 items-center'>
        <MagnifyingGlassIcon className='size-4' />
        Найти...
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <Input
            className='border-none focus-visible:ring-0 focus-visible:ring-offset-0'
            onChange={handleChange}
            placeholder='Начните вводить имя'
            value={searchValue}
          />
        </DialogHeader>
        <div
          className={cn(
            'size-full flex justify-center items-center',
            !isPending && 'hidden',
          )}
        >
          <SymbolIcon className='size-8 animate-spin' />
        </div>
        {suggestions.length ? (
          <>
            <Separator />
            <ul className='w-full rounded-md space-y-4'>
              {suggestions.map(suggestion => (
                <li
                  className='w-full hover:underline underline-offset-4 transition-all duration-150'
                  key={suggestion.id}
                >
                  <DialogClose asChild>
                    <Link
                      className='min-w-full flex gap-x-4 items-center'
                      href={`/user/${suggestion.id}`}
                    >
                      <UserAvatar src={suggestion.image} />
                      {suggestion.name}
                    </Link>
                  </DialogClose>
                </li>
              ))}
            </ul>
          </>
        ) : null}
      </DialogContent>
    </Dialog>
  );
};