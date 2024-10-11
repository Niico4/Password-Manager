'use client';
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Input,
  Pagination,
} from '@nextui-org/react';
import { Password } from '@prisma/client';
import React, { useState, useMemo } from 'react';
import { columns } from './Columns';
import { ServiceCategories } from '../ModalForm/enum/ServicesCategory';
import { IconZoom } from '@tabler/icons-react';
import ModalForm from '../ModalForm/ModalForm';
import DropdownFilter from './DropdownFilter';

const DataTable = ({
  passwords,
  userId,
}: {
  passwords: Password[];
  userId: string;
}) => {
  const [filterValue, setFilterValue] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<Set<string>>(
    new Set(Object.values(ServiceCategories))
  );
  const [page, setPage] = useState(1);
  const [rowsPerPage] = useState(15);

  const hasSearchFilter = Boolean(filterValue);

  const filteredPasswords = useMemo(() => {
    let filteredPasswords = passwords;

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
  }, [passwords, filterValue, categoryFilter]);

  const pages = Math.ceil(filteredPasswords.length / rowsPerPage);

  const items = useMemo(() => {
    const startPage = (page - 1) * rowsPerPage;
    const endPage = startPage + rowsPerPage;

    return filteredPasswords.slice(startPage, endPage);
  }, [page, filteredPasswords, rowsPerPage]);

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
        />
      </div>
    );
  }, [items.length, page, pages, hasSearchFilter]);

  const topContent = () => (
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
          <ModalForm userId={userId} />
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
                      column.cell({ row: rowItem })
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
