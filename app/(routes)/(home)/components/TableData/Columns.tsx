import { Button, Tooltip } from '@nextui-org/react';
import { IconCopy, IconEdit, IconTrash } from '@tabler/icons-react';
import React from 'react';

import {
  handleCopyPassword,
  handleDeletePassword,
  handleUpdatePassword,
} from '@/app/(routes)/(home)/components/TableData/utils/passwordsHandlers';
import { Column } from '../../interfaces/Column';

export const columns: Column[] = [
  { name: 'Nombre del Servicio', uid: 'nameService', cell: undefined },
  { name: 'Nombre de Usuario', uid: 'username', cell: undefined },
  { name: 'Sitio Web', uid: 'webSite', cell: undefined },
  { name: 'Categoría', uid: 'category', cell: undefined },
  { name: 'Detalles', uid: 'details', cell: undefined },
  {
    uid: 'actions',
    name: 'Acciones',
    cell: ({ row, setEditingPassword, setCurrentPasswords, onOpen }) => {
      const password = row.password;
      const username = row.username;

      const handleCopyClick = () => handleCopyPassword(password, username);
      const handleEditClick = () =>
        handleUpdatePassword(
          row,
          setEditingPassword,
          setCurrentPasswords,
          onOpen
        );

      const handleDeleteClick = async () =>
        await handleDeletePassword(row.id, username, setCurrentPasswords);

      return (
        <div className="flex gap-2 justify-center items-center">
          {password && (
            <Tooltip
              content="Copiar Contraseña"
              color="success"
              showArrow
              size="sm"
            >
              <Button
                size="sm"
                variant="flat"
                color="success"
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

          <Tooltip
            content="Eliminar Contraseña"
            color="danger"
            showArrow
            size="sm"
          >
            <Button
              size="sm"
              startContent={<IconTrash stroke={1} />}
              color="danger"
              variant="flat"
              isIconOnly
              onClick={handleDeleteClick}
              aria-label={`Eliminar contraseña de ${username}`}
            />
          </Tooltip>
        </div>
      );
    },
  },
];
