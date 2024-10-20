import React from 'react';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';

import Title from '@/app/components/shared/Title';
import { db } from '@/utils/prisma';
import { countPasswords } from '@/utils/countPasswords';

import ProgressBarPasswords from './components/ProgressBarPasswords';
import ProgressCirclePasswords from './components/ProgressCirclePasswords';

const AnalyticsPage = async () => {
  const session = await getServerSession();

  if (!session || !session.user?.email) redirect('/');

  const user = await db.user.findUnique({
    where: {
      email: session.user.email,
    },
    include: {
      passwords: {
        orderBy: {
          createdAt: 'desc',
        },
      },
    },
  });

  if (!user || !user.passwords) redirect('/');

  const {
    repeatedPasswords,
    categoryCount,
    favoriteCount,
    totalPasswordsCount,
  } = countPasswords(user.passwords);

  return (
    <section>
      <Title title="Tus Estadísticas" />
      <article className="flex items-center gap-5">
        <ProgressBarPasswords
          repeatedPasswords={repeatedPasswords}
          favoriteCount={favoriteCount}
          categoryCount={categoryCount}
        />
        <ProgressCirclePasswords totalPasswordsCount={totalPasswordsCount} />
      </article>
    </section>
  );
};

export default AnalyticsPage;
