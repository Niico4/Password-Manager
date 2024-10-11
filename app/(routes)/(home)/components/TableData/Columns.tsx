import { Tooltip, Button } from '@nextui-org/react';
import { Password } from '@prisma/client';
import { IconCopy, IconEdit } from '@tabler/icons-react';
import React from 'react';
import { toast } from 'react-toastify';

interface Column {
  uid: string;
  name: string;
  cell?: (props: { row: Password }) => JSX.Element;
}

export const columns: Column[] = [
  { name: 'Nombre del Servicio', uid: 'nameService' },
  { name: 'Nombre de Usuario', uid: 'username' },
  { name: 'Sitio Web', uid: 'webSite' },
  { name: 'Categoría', uid: 'category' },
  { name: 'Detalles', uid: 'details' },
  {
    uid: 'actions',
    name: 'Acciones',
    cell: ({ row }) => {
      const password = row.password;
      const username = row.username;

      const handleCopyPassword = (item: string, name: string) => {
        navigator.clipboard.writeText(item);
        toast.success(
          `La contraseña de ${name} se ha copiado al portapapeles.`
        );
      };

      const handleUpdatePassword = () => {
        console.log('Editandoooo');
      };

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
                onClick={() => handleCopyPassword(password, username)}
                aria-label={`Copiar contraseña de ${username}`}
              />
            </Tooltip>
          )}
          <Tooltip
            content="Editar Contraseña"
            color="primary"
            showArrow
            size="sm"
          >
            <Button
              size="sm"
              startContent={<IconEdit stroke={1} />}
              color="warning"
              variant="flat"
              isIconOnly
              onClick={handleUpdatePassword}
              aria-label={`Editar contraseña de ${username}`}
            />
          </Tooltip>
        </div>
      );
    },
  },
];
