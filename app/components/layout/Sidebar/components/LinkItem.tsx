'use client';

import { Icon } from '@tabler/icons-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FC } from 'react';

interface Props {
  href: string;
  icon: Icon;
  label: string;
}

const LinkItem: FC<Props> = ({ href, label, icon: Icon }) => {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={`flex gap-2 items-center text-small px-4 py-2 rounded-lg transition-all hover:bg-blue-200 hover:text-blue-500 ${
        isActive ? 'bg-blue-500 text-white' : ''
      }`}
    >
      <Icon stroke={1} />
      {label}
    </Link>
  );
};

export default LinkItem;
