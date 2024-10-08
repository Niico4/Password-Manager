import { Button, Card, CardBody, CardHeader, Input } from '@nextui-org/react';
import { signIn } from 'next-auth/react';
import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import React from 'react';
import Title from '@/app/components/Shared/Title';

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

      toast.success('Sesión Iniciada');
      reset();
      router.push('/');
    } catch (error) {
      console.error('Error inesperado', error);
      toast.error('Ocurrió un error inesperado. Por favor intenta de nuevo.');
    }
  };

  return (
    <Card className="w-[500px] mx-auto p-4 bg-white/10" isBlurred>
      <CardHeader className="flex-col items-start">
        <Title
          title="¡Bienvenido de nuevo! Protege tu mundo digital"
          className="text-zinc-200"
        />
      </CardHeader>
      <CardBody>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col items-end"
        >
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

          <Link
            href={'#'}
            className="text-sm text-blue-500 font-medium  my-4 hover:text-blue-600 transition-all"
          >
            ¿Olvidaste tu contraseña?
          </Link>

          <Button
            type="submit"
            variant="solid"
            color="primary"
            size="lg"
            fullWidth
          >
            Iniciar Sesión
          </Button>
        </form>
      </CardBody>
    </Card>
  );
};

export default FormSignIn;
