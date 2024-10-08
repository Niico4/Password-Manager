import Title from '@/app/components/Shared/Title';
import { Card, CardBody, CardHeader } from '@nextui-org/react';
import React from 'react';

import FormSignUp from './FormSignUp';

const SignUpPage = () => {
  return (
    <Card className="w-[500px] mx-auto p-4 bg-white/10" isBlurred>
      <CardHeader className="flex-col items-start">
        <Title
          title="Regístrate y Olvídate de Recordar Contraseñas"
          className="text-zinc-200"
        />
      </CardHeader>
      <CardBody>
        <FormSignUp />
      </CardBody>
    </Card>
  );
};

export default SignUpPage;
