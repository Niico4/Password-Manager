'use client';

import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Input,
  useDisclosure,
} from '@nextui-org/react';
import { User } from '@prisma/client';
import React, { FC } from 'react';
import Image from 'next/image';

import ModalFormProfile from './ModalFormProfile';

const CardProfile: FC<{ user: User }> = ({ user }) => {
  const { onOpen, isOpen, onClose, onOpenChange } = useDisclosure();

  return (
    <>
      <Card className="w-1/3 mx-auto my-10">
        <CardHeader className="justify-center">
          <Image
            src={user.profileImage ?? '/image.webp'}
            alt="Imagen de Perfil"
            width={200}
            height={200}
            className="rounded-md object-cover"
          />
        </CardHeader>
        <CardBody className="w-11/12 mx-auto gap-4">
          <div className="flex items-center gap-4">
            <Input
              label="Nombre"
              value={user.name}
              isReadOnly
              variant="faded"
              color="primary"
            />
            <Input
              label="Apellido"
              value={user.lastName}
              isReadOnly
              variant="faded"
              color="primary"
            />
          </div>
          <div className="flex items-center gap-4">
            <Input
              label="Correo electrónico"
              value={user.email}
              isReadOnly
              variant="faded"
              color="primary"
            />
            <Input
              label="Nombre de Usuario"
              value={user.username}
              isReadOnly
              variant="faded"
              color="primary"
            />
          </div>
        </CardBody>
        <CardFooter className="justify-center">
          <Button
            type="submit"
            variant="flat"
            color="secondary"
            onPress={onOpen}
          >
            Editar Perfil
          </Button>
        </CardFooter>
      </Card>

      <ModalFormProfile
        user={user}
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        onClose={onClose}
      />
    </>
  );
};

export default CardProfile;
