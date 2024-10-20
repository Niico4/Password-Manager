import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import React from 'react';

import { db } from '@/utils/prisma';
import Title from '@/app/components/shared/Title';

import CardProfile from './modal-form-profile/CardProfile';

const UserProfilePage = async () => {
  const session = await getServerSession();

  if (!session || !session.user?.email) redirect('/');

  const user = await db.user.findUnique({
    where: { email: session.user.email },
  });

  if (!user) redirect('/');

  return (
    <section>
      <Title title="Tu Perfil" />
      <CardProfile user={user} />
    </section>
  );
};

export default UserProfilePage;
