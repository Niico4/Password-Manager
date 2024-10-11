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
import { useState } from 'react';

const ModalForm = ({ userId }: { userId: string }) => {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const { reset } = useForm();
  const { refresh } = useRouter();

  const handleSubmit = async (values: zod.infer<typeof passwordSchema>) => {
    if (!values.category) {
      values.category = ServiceCategories.OTROS;
    }
    try {
      await axios.post('/api/passwords', values);
      toast.success('Contraseña Guardada Correctamente');
      refresh();

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

      onClose();
    } catch (error) {
      console.error(error);
      const errorMessage = axios.isAxiosError(error)
        ? error.response?.data.message
        : 'Algo salió mal';
      toast.error(errorMessage);
    }
  };

  return (
    <>
      <Button
        onPress={onOpen}
        color="primary"
        variant="shadow"
        endContent={<IconPlus stroke={1.75} />}
        aria-label="Agregar nueva contraseña"
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
