import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
} from '@nextui-org/react';
import { Password } from '@prisma/client';
import { IconPlus } from '@tabler/icons-react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { FC, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

import { validateCategory } from '@/utils/validatePasswordCategory';

import { ServiceCategories } from './enum/ServicesCategory';
import Form from './Form';
import { PasswordType } from './validation/PasswordSchema';

interface ModalProps {
  editingPassword: Password | null;
  setEditingPassword: React.Dispatch<React.SetStateAction<Password | null>>;

  isOpen: boolean;
  onClose: () => void;
  onOpen: () => void;
  onOpenChange: () => void;
  userId: string;
}

const ModalForm: FC<ModalProps> = ({
  editingPassword,
  setEditingPassword,
  isOpen,
  onClose,
  onOpen,
  onOpenChange,
  userId,
}) => {
  const { reset, setValue } = useForm<PasswordType>();
  const { refresh } = useRouter();

  const handleSubmit = async (values: PasswordType) => {
    const category = values.category || ServiceCategories.OTROS;

    const ACTIONS = editingPassword
      ? axios.put(`/api/passwords/update/${editingPassword.id}`, {
          ...values,
          category,
        })
      : axios.post('/api/passwords/create', { ...values, category });

    const ACTION_MESSAGE = editingPassword
      ? 'Contraseña Actualizada Correctamente'
      : 'Contraseña Guardada Correctamente';

    try {
      await ACTIONS;
      toast.success(ACTION_MESSAGE);

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
      refresh();
    } catch (error) {
      console.error('Error inesperado', error);
      if (axios.isAxiosError(error) && error.response) {
        toast.error(error.response.data.message || 'Error inesperado');
      }
    }
  };

  const setFormValues = (passwordValues: Password | null) => {
    if (!passwordValues) return;

    setValue('nameService', passwordValues.nameService);
    setValue('username', passwordValues.username);
    setValue('password', passwordValues.password);
    setValue('webSite', passwordValues.webSite || '');
    setValue('details', passwordValues.details || '');
    setValue('category', validateCategory(passwordValues.category));
    setValue('isFavorite', passwordValues.isFavorite);
  };

  useEffect(() => {
    if (isOpen && editingPassword) {
      setFormValues(editingPassword);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, editingPassword, setValue]);

  const isEditing = Boolean(editingPassword);

  return (
    <>
      <Button
        onPress={() => {
          setEditingPassword(null);
          onOpen();
        }}
        color="primary"
        variant="shadow"
        endContent={<IconPlus stroke={1.75} />}
        aria-label="Crear Contraseña"
      >
        Crear Contraseña
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="top-center">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                {isEditing ? 'Edita tu Contraseña' : 'Crea tu Contraseña'}
              </ModalHeader>
              <ModalBody>
                <Form
                  editingPassword={editingPassword}
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
