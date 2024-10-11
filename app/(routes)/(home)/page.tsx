import Title from '@/app/components/Shared/Title';
import React from 'react';
import ModalForm from './components/ModalForm/ModalForm';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { db } from '@/utils/prisma';
import DataTable from './components/TableData/DataTable';

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
      <Title title="Todas Las Contraseñas Guardadas" className="mt-6" />
      <DataTable passwords={user.passwords} userId={user?.id} />
    </section>
  );
};

export default HomePage;
