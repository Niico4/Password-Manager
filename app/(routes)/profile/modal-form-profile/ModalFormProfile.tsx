'use client';

import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
} from '@nextui-org/react';
import { User } from '@prisma/client';
import React, { FC } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import Image from 'next/image';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import { ClientUploadedFileData } from 'uploadthing/types';

import { UploadButton } from '@/utils/uploadThing';
import { ModalProps } from '@/app/interfaces/PasswordManagement';

import { profileSchema } from './validation/ProfileSchema';

interface Props
  extends Omit<
    ModalProps,
    | 'userId'
    | 'editingPassword'
    | 'setEditingPassword'
    | 'setCurrentPasswords'
    | 'onOpen'
  > {
  user: User;
}

const ModalFormProfile: FC<Props> = ({
  user,
  isOpen,
  onOpenChange,
  onClose,
}) => {
  const { refresh } = useRouter();
  const {
    handleSubmit,
    register,
    formState: { errors },
    setValue,
  } = useForm<z.infer<typeof profileSchema>>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: user.name,
      lastName: user.lastName,
      email: user.email,
      username: user.username,
      profileImage: user.profileImage || '',
      id: user.id,
    },
    mode: 'all',
  });

  const onSubmit = async (values: z.infer<typeof profileSchema>) => {
    try {
      await axios.patch('/api/profile', values);
      toast.success('Perfil Actualizado');

      refresh();
      onClose();
    } catch (error) {
      console.error('Error inesperado', error);
      if (axios.isAxiosError(error) && error.response) {
        toast.error(error.response.data.message || 'Error inesperado');
      }
    }
  };

  const handleImageUploadComplete = (res: ClientUploadedFileData<null>[]) => {
    setValue('profileImage', res?.[0].url);
    toast.success('Imagen subida correctamente');
  };

  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      placement="top-center"
      size="lg"
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader>
              <h2 className="text-lg font-bold">Edita tus Datos</h2>
            </ModalHeader>
            <ModalBody>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="flex flex-col items-center mb-6">
                  <Image
                    src={user.profileImage ?? '/image.webp'}
                    alt="Imagen de Perfil"
                    width={300}
                    height={300}
                    className="rounded-md object-cover mx-auto mb-6"
                  />

                  <UploadButton
                    className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-gray-900 rounded-md hover:bg-gray-700 text-gray-300"
                    {...register('profileImage')}
                    endpoint="profileImage"
                    onClientUploadComplete={handleImageUploadComplete}
                    onUploadError={(error) => {
                      toast.error('Error al subir la imagen', error);
                    }}
                    onChange={() => {}}
                    content={{
                      button({ ready }) {
                        if (ready) return <div>Subir Imagen</div>;
                      },
                    }}
                  />
                </div>

                <div className="flex flex-col gap-4">
                  <div className="flex gap-4 items-center justify-center">
                    <Input
                      label="Nombre"
                      {...register('name')}
                      isInvalid={!!errors.name}
                      errorMessage={errors.name?.message}
                      variant="faded"
                      color="primary"
                    />
                    <Input
                      label="Apellido"
                      {...register('lastName')}
                      isInvalid={!!errors.lastName}
                      errorMessage={errors.lastName?.message}
                      variant="faded"
                      color="primary"
                    />
                  </div>
                  <div className="flex gap-4 items-center justify-center">
                    <Input
                      label="Correo electrónico"
                      {...register('email')}
                      isInvalid={!!errors.email}
                      errorMessage={errors.email?.message}
                      variant="faded"
                      color="primary"
                    />
                    <Input
                      label="Nombre de Usuario"
                      {...register('username')}
                      isInvalid={!!errors.username}
                      errorMessage={errors.username?.message}
                      variant="faded"
                      color="primary"
                    />
                  </div>
                </div>
                <div className="flex gap-4 items-center justify-end my-4 mt-6">
                  <Button onPress={onClose} variant="flat" color="danger">
                    Descartar
                  </Button>
                  <Button type="submit" color="primary">
                    Guardar
                  </Button>
                </div>
              </form>
            </ModalBody>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default ModalFormProfile;
