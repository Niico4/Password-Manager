import { Password } from '@prisma/client';
import { Dispatch, SetStateAction } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';

import { validateCategory } from './validatePasswordCategory';

export const handleCopyPassword = async (item: string, name: string | null) => {
  try {
    await navigator.clipboard.writeText(item);
    toast.success(`La contraseña de ${name} se ha copiado al portapapeles.`);
  } catch (error) {
    toast.error(`No se pudo copiar la contraseña de ${name}.`);
  }
};

export const handleUpdatePassword = (
  row: Password,
  setEditingPassword: Dispatch<SetStateAction<Password | null>>,
  setCurrentPasswords: Dispatch<SetStateAction<Password[]>>,
  onOpen: () => void
) => {
  const updatedRow: Password = {
    ...row,
    category: validateCategory(row.category),
  };

  setCurrentPasswords((prev) =>
    prev.map((password) =>
      password.id === updatedRow.id ? updatedRow : password
    )
  );
  setEditingPassword(updatedRow);
  onOpen();
};

export const handleDeletePassword = async (
  id: string,
  name: string,
  setCurrentPasswords: Dispatch<SetStateAction<Password[]>>
) => {
  try {
    await axios.delete(`/api/passwords/delete/${id}`);

    setCurrentPasswords((prevPasswords) =>
      prevPasswords.filter((password) => password.id !== id)
    );

    toast.success(`La contraseña de ${name} se ha eliminado`);
  } catch (error) {
    console.error(error);
    toast.error(`No se pudo eliminar la contraseña de ${name}.`);
  }
};
