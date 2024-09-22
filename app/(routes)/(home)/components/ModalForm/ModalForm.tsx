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
import { formSchema } from './FormSchema';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { ServiceCategories } from './ServicesCategory';
import { useRouter } from 'next/navigation';

const ModalForm = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { reset } = useForm();
  const { refresh } = useRouter();

  const handleSubmit = async (values: zod.infer<typeof formSchema>) => {
    try {
      await axios.post('/api/passwords', values);
      toast.success('Contraseña Creada Correctamente');

      reset({
        nameService: '',
        password: '',
        webSite: '',
        category: ServiceCategories.OTROS,
        details: '',
        userId: '',
      });

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
                <Form onClose={onClose} onSubmit={handleSubmit} />
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default ModalForm;
