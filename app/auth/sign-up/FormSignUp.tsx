'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Input } from '@nextui-org/react';
import { useRouter } from 'next/navigation';
import React from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

import { IFormSignUp, signUpSchema } from './validations/SignUpSchema';

const FormSignUp = () => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IFormSignUp>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: '',
      lastName: '',
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
    mode: 'all',
  });

  const onSubmit = async (data: IFormSignUp) => {
    try {
      const response = await fetch('/api/auth/sign-up', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: data.name,
          lastName: data.lastName,
          username: data.username,
          email: data.email,
          password: data.password,
          confirmPassword: data.confirmPassword,
        }),
      });

      const errorData = await response.json();
      if (!response.ok) {
        toast.error(errorData.error || 'Error al crear el usuario');
        return;
      }

      toast.success('Usuario creado correctamente');
      router.push('/auth/sign-in');
      reset();
    } catch (error) {
      console.error(error);
      toast.error('Ocurrió un error inesperado. Por favor intenta de nuevo.');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col items-end">
      <div className="flex flex-col gap-4 w-full mb-6">
        <div className="flex items-center justify-center gap-4">
          <Input
            type="text"
            label="Nombre"
            variant="faded"
            isRequired
            isInvalid={!!errors.name}
            errorMessage={errors.name?.message}
            {...register('name')}
          />

          <Input
            type="text"
            label="Apellido"
            variant="faded"
            isRequired
            isInvalid={!!errors.lastName}
            errorMessage={errors.lastName?.message}
            {...register('lastName')}
          />
        </div>
        <Input
          type="text"
          label="Nombre de Usuario"
          variant="faded"
          isRequired
          isInvalid={!!errors.username}
          errorMessage={errors.username?.message}
          {...register('username')}
        />
        <Input
          type="email"
          label="Correo Electrónico"
          variant="faded"
          isRequired
          isInvalid={!!errors.email}
          errorMessage={errors.email?.message}
          {...register('email')}
        />
        <div className="flex items-center justify-center gap-4">
          <Input
            type="password"
            label="Contraseña"
            variant="faded"
            isRequired
            isInvalid={!!errors.password}
            errorMessage={errors.password?.message}
            {...register('password')}
          />
          <Input
            type="password"
            label="Confirmar Contraseña"
            variant="faded"
            isRequired
            isInvalid={!!errors.confirmPassword}
            errorMessage={errors.confirmPassword?.message}
            {...register('confirmPassword')}
          />
        </div>
      </div>

      <Button type="submit" variant="solid" color="primary" size="lg" fullWidth>
        Crear Cuenta
      </Button>
    </form>
  );
};

export default FormSignUp;
