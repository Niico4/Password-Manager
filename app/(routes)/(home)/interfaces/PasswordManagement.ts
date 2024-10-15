import { Password } from '@prisma/client';
import { Dispatch, SetStateAction } from 'react';

export interface PasswordManagementProps {
  editingPassword: Password | null;
  setEditingPassword: Dispatch<SetStateAction<Password | null>>;
  setCurrentPasswords: Dispatch<SetStateAction<Password[]>>;
}

export interface TopContntProps extends PasswordManagementProps {
  isOpen: boolean;
  page: number;
  rowsPerPage: number;
  userId: string;

  categoryFilter: Set<string>;
  filteredPasswords: Password[];

  setCategoryFilter: Dispatch<SetStateAction<Set<string>>>;
  setFilterValue: (value: SetStateAction<string>) => void;

  handleModalClose: () => void;
  onOpen: () => void;
  onOpenChange: () => void;
}

export interface ModalProps extends PasswordManagementProps {
  isOpen: boolean;
  onClose: () => void;
  onOpen: () => void;
  onOpenChange: () => void;
  userId: string;
}
