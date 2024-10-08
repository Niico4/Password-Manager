import { Grandstander } from 'next/font/google';
import React from 'react';

const grandstander = Grandstander({
  subsets: ['latin'],
  weight: ['600'],
});

const Title = ({ title, className }: { title: string; className?: string }) => {
  return (
    <h1
      className={`${grandstander.className} text-zinc-600 text-3xl font-semibold ${className}`}
    >
      {title}
    </h1>
  );
};

export default Title;
