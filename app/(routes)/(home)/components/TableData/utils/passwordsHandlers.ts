import { Password } from '@prisma/client';
import { Dispatch, SetStateAction } from 'react';
import { toast } from 'react-toastify';

import { validateCategory } from '../../../../../../utils/validatePasswordCategory';

export const handleCopyPassword = async (item: string, name: string) => {
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
  onOpen: () => void
) => {
  const updatedRow: Password = {
    ...row,
    category: validateCategory(row.category),
  };
  setEditingPassword(updatedRow);
  onOpen();
};
