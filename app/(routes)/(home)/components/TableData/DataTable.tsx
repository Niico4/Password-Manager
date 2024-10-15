'use client';
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Pagination,
  useDisclosure,
} from '@nextui-org/react';
import { Password } from '@prisma/client';
import React, { useState, useMemo, useEffect, FC } from 'react';

import { ServiceCategories } from '../ModalForm/enum/ServicesCategory';

import { columns } from './Columns';
import { useRouter } from 'next/navigation';
import TopContentDataTable from './TopContent';

interface Props {
  passwords: Password[];
  userId: string;
}

const DataTable: FC<Props> = ({ passwords, userId }) => {
  const [filterValue, setFilterValue] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<Set<string>>(
    new Set(Object.values(ServiceCategories))
  );
  const [page, setPage] = useState(1);
  const [rowsPerPage] = useState(15);
  const [editingPassword, setEditingPassword] = useState<Password | null>(null);
  const [currentPasswords, setCurrentPasswords] =
    useState<Password[]>(passwords);

  const { onOpen, isOpen, onClose, onOpenChange } = useDisclosure();
  const { refresh } = useRouter();

  const filteredPasswords = useMemo(() => {
    let filteredPasswords = currentPasswords;

    if (filterValue) {
      filteredPasswords = filteredPasswords.filter(
        (password) =>
          password.nameService
            .toLowerCase()
            .includes(filterValue.toLowerCase()) ||
          password.username.toLowerCase().includes(filterValue.toLowerCase())
      );
    }

    if (categoryFilter.size > 0) {
      filteredPasswords = filteredPasswords.filter(
        (password) => password.category && categoryFilter.has(password.category)
      );
    }
    return filteredPasswords;
  }, [currentPasswords, filterValue, categoryFilter]);

  const pages = Math.ceil(filteredPasswords.length / rowsPerPage);

  const items = useMemo(() => {
    const startPage = (page - 1) * rowsPerPage;
    const endPage = startPage + rowsPerPage;

    return filteredPasswords.slice(startPage, endPage);
  }, [page, filteredPasswords, rowsPerPage]);

  const handleModalClose = () => {
    setEditingPassword(null);
    refresh();
    onClose();
  };

  useEffect(() => {
    setCurrentPasswords(passwords);
  }, [passwords]);

  const topContent = () => {
    return (
      <TopContentDataTable
        categoryFilter={categoryFilter}
        editingPassword={editingPassword}
        filteredPasswords={filteredPasswords}
        handleModalClose={handleModalClose}
        isOpen={isOpen}
        onOpen={onOpen}
        onOpenChange={onOpenChange}
        page={page}
        rowsPerPage={rowsPerPage}
        setCategoryFilter={setCategoryFilter}
        setCurrentPasswords={setCurrentPasswords}
        setEditingPassword={setEditingPassword}
        setFilterValue={setFilterValue}
        userId={userId}
      />
    );
  };

  const bottomContent = useMemo(() => {
    return (
      <div className="py-2 px-2 flex justify-center items-center">
        <Pagination
          isCompact
          showControls
          showShadow
          color="primary"
          page={page}
          total={pages}
          onChange={setPage}
          aria-label="Controles de paginación"
        />
      </div>
    );
  }, [page, pages]);

  return (
    <section className="my-16">
      <Table
        aria-label="Tabla for Passwords User"
        color="primary"
        bottomContent={bottomContent}
        topContent={topContent()}
        className="w-4/5 mx-auto"
      >
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn
              className="bg-violet-100 text-sm uppercase text-violet-700"
              align="center"
              key={column.uid}
            >
              {column.name}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody items={items} emptyContent="No hay contraseñas">
          {(rowItem) => (
            <TableRow key={rowItem.id}>
              {(columnKey) => {
                const column = columns.find((col) => col.uid === columnKey);
                const value = rowItem[columnKey as keyof Password];

                return (
                  <TableCell>
                    {column && column.cell ? (
                      column.cell({
                        row: rowItem,
                        setEditingPassword,
                        setCurrentPasswords,
                        onOpen,
                      })
                    ) : typeof value === 'string' && value.includes('http') ? (
                      <a
                        href={value}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 underline"
                      >
                        {value}
                      </a>
                    ) : value instanceof Date ? (
                      value.toLocaleDateString()
                    ) : (
                      value?.toString() ?? ''
                    )}
                  </TableCell>
                );
              }}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </section>
  );
};

export default DataTable;
