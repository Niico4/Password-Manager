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
import { FC, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

import { validateCategory } from '@/utils/validatePasswordCategory';

import { ServiceCategories } from '../../../../utils/enum/ServicesCategory';
import Form from './Form';
import { PasswordType } from '../../../../utils/validation/PasswordSchema';
import { ModalProps } from '../interfaces/PasswordManagement';

const ModalForm: FC<ModalProps> = ({
  userId,
  isOpen,
  editingPassword,
  setCurrentPasswords,
  setEditingPassword,
  onClose,
  onOpen,
  onOpenChange,
}) => {
  const { reset, setValue } = useForm<PasswordType>();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const ACTION_MESSAGE = editingPassword
    ? 'Contraseña Actualizada Correctamente'
    : 'Contraseña Guardada Correctamente';

  const updatePasswords = (updatedPassword: Password) => {
    setCurrentPasswords((prevPasswords) => {
      if (editingPassword) {
        return prevPasswords.map((password) =>
          password.id === updatedPassword.id ? updatedPassword : password
        );
      }
      return [updatedPassword, ...prevPasswords];
    });
  };

  const handleSubmit = async (values: PasswordType) => {
    const category = values.category || ServiceCategories.OTROS;
    if (isSubmitting) return;

    setIsSubmitting(true);

    try {
      const response = editingPassword
        ? await axios.put(`/api/passwords/update/${editingPassword.id}`, {
            ...values,
            category,
          })
        : await axios.post('/api/passwords/create', { ...values, category });

      const updatedPassword: Password = response.data;

      updatePasswords(updatedPassword);

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
    } catch (error) {
      console.error('Error inesperado', error);
      if (axios.isAxiosError(error) && error.response) {
        toast.error(error.response.data.message || 'Error inesperado');
      }
    } finally {
      setIsSubmitting(false);
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
        isDisabled={isSubmitting}
        color="secondary"
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
