import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import React from 'react';

import { db } from '@/utils/prisma';
import Title from '@/app/components/shared/Title';
import DataTable from '@/app/components/shared/table-data/DataTable';

const HomePage = async () => {
  const session = await getServerSession();

  if (!session || !session.user?.email) {
    return redirect('/');
  }

  const user = await db.user.findUnique({
    where: { email: session.user.email },
    include: {
      passwords: {
        orderBy: {
          createdAt: 'desc',
        },
      },
    },
  });

  if (!user?.id || !user.passwords) {
    return redirect('/');
  }

  return (
    <section>
      <Title title="Todas Las Contraseñas Guardadas" />
      <DataTable passwords={user.passwords} userId={user?.id} />
    </section>
  );
};

export default HomePage;
