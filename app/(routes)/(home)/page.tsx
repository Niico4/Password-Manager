import Title from '@/app/components/Shared/Title';
import React from 'react';
import ModalForm from './components/ModalForm/ModalForm';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { db } from '@/utils/prisma';

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

  if (!user?.id) {
    return redirect('/');
  }

  return (
    <div className="flex justify-between">
      <Title title="Todas Las Contraseñas Guardadas" />
      <ModalForm userId={user?.id} />
    </div>
  );
};

export default HomePage;
