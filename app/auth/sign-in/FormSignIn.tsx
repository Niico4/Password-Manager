'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Input } from '@nextui-org/react';
import { signIn } from 'next-auth/react';
// import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { z } from 'zod';

const signInSchema = z.object({
  email: z.string().email({ message: 'El correo electrónico no es válido' }),
  password: z.string().min(8, { message: 'La contraseña no es válida' }),
});

type IFormSignIn = z.infer<typeof signInSchema>;

const FormSignIn = () => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IFormSignIn>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: '',
      password: '',
    },
    mode: 'all',
  });

  const onSubmit = async (data: IFormSignIn) => {
    try {
      const response = await signIn('credentials', {
        email: data.email,
        password: data.password,
        redirect: false,
      });

      if (response?.error || !response?.ok) {
        toast.error(response?.error || 'Error al iniciar sesión');
        return;
      }

      toast.success('Iniciando sesión');
      router.push('/');
      reset();
    } catch (error) {
      console.error('Error inesperado', error);
      toast.error('Ocurrió un error inesperado. Por favor intenta de nuevo.');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col items-end">
      <div className="flex flex-col gap-4 w-full">
        <Input
          type="email"
          label="Correo Electrónico"
          variant="faded"
          isRequired
          isInvalid={!!errors.email}
          errorMessage={errors.email?.message}
          {...register('email')}
        />
        <Input
          type="password"
          label="Contraseña"
          variant="faded"
          isRequired
          isInvalid={!!errors.password}
          errorMessage={errors.password?.message}
          {...register('password')}
        />
      </div>

      {/* <Link
        href={'#'}
        className="text-sm text-blue-300 font-medium  my-4 hover:text-blue-500 transition-all"
      >
        ¿Olvidaste tu contraseña?
      </Link> */}

      <Button type="submit" variant="solid" color="primary" size="lg" fullWidth>
        Iniciar Sesión
      </Button>
    </form>
  );
};

export default FormSignIn;
