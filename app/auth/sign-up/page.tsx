import { Card, CardBody, CardFooter, CardHeader } from '@nextui-org/react';
import React from 'react';
import Link from 'next/link';

import Title from '@/app/components/shared/Title';

import FormSignUp from './FormSignUp';

const SignUpPage = () => {
  return (
    <Card className="w-[500px] mx-auto p-4 bg-white/10" isBlurred>
      <CardHeader className="flex-col items-start">
        <Title
          title="Regístrate y Olvídate de Recordar Contraseñas"
          className="text-gray-200"
        />
      </CardHeader>
      <CardBody>
        <FormSignUp />
      </CardBody>
      <CardFooter className="justify-center">
        <p className="text-gray-200">
          ¿Ya tienes cuenta?{' '}
          <Link
            href="/auth/sign-in"
            className="text-blue-300 hover:text-blue-500 transition-all underline"
          >
            Inicia Sesión
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
};

export default SignUpPage;
