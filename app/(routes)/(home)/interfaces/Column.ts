import { Password } from '@prisma/client';
import { Dispatch, SetStateAction } from 'react';

export interface Column {
  uid: string;
  name: string;
  cell?: (props: {
    setEditingPassword: Dispatch<SetStateAction<Password | null>>;
    setCurrentPasswords: Dispatch<SetStateAction<Password[]>>;

    onOpen: () => void;
    row: Password;
  }) => JSX.Element;
}
