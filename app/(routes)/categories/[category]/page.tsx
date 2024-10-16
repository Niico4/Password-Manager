import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import React, { FC } from 'react';

import { db } from '@/utils/prisma';
import Title from '@/app/components/shared/Title';
import DataTable from '@/app/components/shared/table-data/DataTable';
import { ServiceCategories } from '@/utils/enum/ServicesCategory';

interface Props {
  params: {
    category: string;
  };
}

const categoryMap: { [key: string]: string | null } = {
  social: ServiceCategories.SOCIAL,
  videogames: ServiceCategories.VIDEOGAMES,
  subscriptions: ServiceCategories.SUBSCRIPTION,
  favorites: 'favorites',
};

const fetchUserPasswords = async (email: string, category?: string) => {
  return db.user.findUnique({
    where: { email },
    include: {
      passwords: {
        where: category
          ? { category: category as keyof typeof ServiceCategories }
          : { isFavorite: true },
        orderBy: { createdAt: 'desc' },
      },
    },
  });
};

const PasswordCategoryPage: FC<Props> = async ({ params }) => {
  const session = await getServerSession();
  if (!session || !session.user?.email) return redirect('/');

  const categoryParam = params.category.toLowerCase();
  const category = categoryMap[categoryParam];

  if (!category) return redirect('/');

  const user = await fetchUserPasswords(
    session.user.email,
    category !== 'favorites' ? category : undefined
  );

  if (!user || !user.passwords) return redirect('/');

  const title =
    category === 'favorites'
      ? 'Tus Contraseñas Favoritas'
      : category === ServiceCategories.SOCIAL
      ? 'Contraseñas Sociales'
      : `Contraseñas de ${category}`;

  return (
    <section>
      <Title title={title} />
      <DataTable passwords={user.passwords} userId={user.id} />
    </section>
  );
};

export default PasswordCategoryPage;
