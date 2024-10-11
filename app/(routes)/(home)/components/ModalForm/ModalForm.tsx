'use client';

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  Button,
  useDisclosure,
} from '@nextui-org/react';
import { IconPlus } from '@tabler/icons-react';
import Form from './Form';
import { z as zod } from 'zod';
import { passwordSchema } from './validation/PasswordSchema';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { ServiceCategories } from './enum/ServicesCategory';
import { useRouter } from 'next/navigation';

const ModalForm = ({ userId }: { userId: string }) => {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const { reset } = useForm();
  const { refresh } = useRouter();

  const handleSubmit = async (values: zod.infer<typeof passwordSchema>) => {
    try {
      await axios.post('/api/passwords', values);

      reset({
        category: ServiceCategories.OTROS,
        details: '',
        isFavorite: false,
        nameService: '',
        password: '',
        userId,
        username: '',
        webSite: '',
      });

      toast.success('Contraseña Guardada Correctamente');
      onClose();
      refresh();
    } catch (error) {
      console.error(error);
      toast.error('Algo salió mal');
    }
  };

  return (
    <>
      <Button
        onPress={onOpen}
        color="primary"
        variant="shadow"
        startContent={<IconPlus stroke={1.75} />}
      >
        Nueva Contraseña
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="top-center">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Crea tu Contraseña
              </ModalHeader>
              <ModalBody>
                <Form
                  userId={userId}
                  onClose={onClose}
                  onSubmit={handleSubmit}
                />
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default ModalForm;
