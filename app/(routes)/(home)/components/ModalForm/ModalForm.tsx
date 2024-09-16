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
import { v4 as uuid } from 'uuid';

const ModalForm = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const handleSubmit = (values: zod.infer<typeof formSchema>) => {
    const newValue = { ...values, id: uuid() };

    console.log(newValue);

    toast.success('Guardado correctamente');
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
