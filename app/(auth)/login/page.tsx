import React from 'react';

import { getServerSession } from 'next-auth';
import TabsForm from './components/TabsForm';
import { redirect } from 'next/navigation';

const LoginPage = async () => {
  const session = await getServerSession();

  if (session) {
    redirect('/');
  }

  return (
    <div
      className="h-screen bg-center bg-cover flex items-center justify-center"
      style={{
        backgroundImage: 'url("/bg.webp")',
      }}
    >
      <div className="w-[500px]">
        <TabsForm />
      </div>
    </div>
  );
};

export default LoginPage;
