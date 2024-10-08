import Title from '@/app/components/Shared/Title';
import { Card, CardBody, CardHeader } from '@nextui-org/react';
import React from 'react';

import FormSignIn from './FormSignIn';

const SignInPage = () => {
  return (
    <Card className="w-[500px] mx-auto p-4 bg-white/10" isBlurred>
      <CardHeader className="flex-col items-start">
        <Title
          title="¡Bienvenido de nuevo! Protege tu mundo digital"
          className="text-zinc-200"
        />
      </CardHeader>
      <CardBody>
        <FormSignIn />
      </CardBody>
    </Card>
  );
};

export default SignInPage;
