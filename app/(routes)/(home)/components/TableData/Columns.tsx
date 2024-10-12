import { Button, Tooltip } from '@nextui-org/react';
import { Password } from '@prisma/client';
import { IconCopy, IconEdit } from '@tabler/icons-react';
import React, { Dispatch, SetStateAction } from 'react';

import {
  handleCopyPassword,
  handleUpdatePassword,
} from '@/app/(routes)/(home)/components/TableData/utils/passwordsHandlers';

interface Column {
  uid: string;
  name: string;
  cell?: (props: {
    setEditingPassword: Dispatch<SetStateAction<Password | null>>;

    onOpen: () => void;
    row: Password;
  }) => JSX.Element;
}

export const columns: Column[] = [
  { name: 'Nombre del Servicio', uid: 'nameService', cell: undefined },
  { name: 'Nombre de Usuario', uid: 'username', cell: undefined },
  { name: 'Sitio Web', uid: 'webSite', cell: undefined },
  { name: 'Categoría', uid: 'category', cell: undefined },
  { name: 'Detalles', uid: 'details', cell: undefined },
  {
    uid: 'actions',
    name: 'Acciones',
    cell: ({ row, setEditingPassword, onOpen }) => {
      const password = row.password;
      const username = row.username;

      const handleCopyClick = () => handleCopyPassword(password, username);
      const handleEditClick = () =>
        handleUpdatePassword(row, setEditingPassword, onOpen);

      return (
        <div className="flex gap-2 justify-center items-center">
          {password && (
            <Tooltip
              content="Copiar Contraseña"
              color="secondary"
              showArrow
              size="sm"
            >
              <Button
                size="sm"
                variant="flat"
                color="secondary"
                startContent={<IconCopy stroke={1} />}
                isIconOnly
                onClick={handleCopyClick}
                aria-label={`Copiar contraseña de ${username}`}
              />
            </Tooltip>
          )}
          <Tooltip
            content="Editar Contraseña"
            color="warning"
            showArrow
            size="sm"
          >
            <Button
              size="sm"
              startContent={<IconEdit stroke={1} />}
              color="warning"
              variant="flat"
              isIconOnly
              onClick={handleEditClick}
              aria-label={`Editar contraseña de ${username}`}
            />
          </Tooltip>
        </div>
      );
    },
  },
];
