import { Card, CardBody, CardFooter, CardHeader } from '@nextui-org/react';
import React from 'react';
import Link from 'next/link';

import Title from '@/app/components/shared/Title';

import FormSignIn from './FormSignIn';

const SignInPage = () => {
  return (
    <Card className="w-[500px] mx-auto p-4 bg-white/10" isBlurred>
      <CardHeader className="flex-col items-start">
        <Title
          title="¡Bienvenido de nuevo! Protege tu mundo digital"
          className="text-gray-200"
        />
      </CardHeader>
      <CardBody>
        <FormSignIn />
      </CardBody>
      <CardFooter className="justify-center">
        <p className="text-gray-200">
          ¿Aún no tienes cuenta?{' '}
          <Link
            href="/auth/sign-up"
            className="text-blue-300 hover:text-blue-500 transition-all underline"
          >
            Crea tu cuenta
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
};

export default SignInPage;
