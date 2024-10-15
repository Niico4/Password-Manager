import { Input } from '@nextui-org/react';
import { IconZoom } from '@tabler/icons-react';
import React, { FC } from 'react';
import DropdownFilter from './DropdownFilter';
import ModalForm from '../ModalForm/ModalForm';
import { TopContntProps } from '../../interfaces/PasswordManagement';

const TopContentDataTable: FC<TopContntProps> = ({
  setFilterValue,
  categoryFilter,
  editingPassword,
  handleModalClose,
  isOpen,
  onOpen,
  onOpenChange,
  setCategoryFilter,
  setCurrentPasswords,
  userId,
  filteredPasswords,
  rowsPerPage,
  page,
  setEditingPassword,
}) => {
  return (
    <article>
      <div className="flex justify-between items-center mb-4">
        <Input
          startContent={<IconZoom stroke={1} />}
          className="w-1/3"
          isClearable
          placeholder="Buscar por usuario o servicio"
          onValueChange={(value) => setFilterValue(value)}
        />
        <div className="flex items-center justify-center gap-4">
          <DropdownFilter
            categoryFilter={categoryFilter}
            setCategoryFilter={setCategoryFilter}
          />
          <ModalForm
            userId={userId}
            editingPassword={editingPassword}
            setEditingPassword={setEditingPassword}
            onOpen={onOpen}
            isOpen={isOpen}
            onClose={handleModalClose}
            onOpenChange={onOpenChange}
            setCurrentPasswords={setCurrentPasswords}
          />
        </div>
      </div>
      <span className="text-default-400 text-small">
        {`${(page - 1) * rowsPerPage + 1} - ${Math.min(
          page * rowsPerPage,
          filteredPasswords.length
        )} de ${filteredPasswords.length} Contraseñas`}
      </span>
    </article>
  );
};

export default TopContentDataTable;
