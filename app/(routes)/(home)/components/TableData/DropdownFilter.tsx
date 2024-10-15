import {
  Dropdown,
  DropdownTrigger,
  Button,
  DropdownMenu,
  DropdownItem,
} from '@nextui-org/react';
import { IconChevronDown } from '@tabler/icons-react';
import React, { FC } from 'react';

import { ServiceCategories } from '../ModalForm/enum/ServicesCategory';

interface Props {
  categoryFilter: Set<string>;
  setCategoryFilter: (value: React.SetStateAction<Set<string>>) => void;
}

const DropdownFilter: FC<Props> = ({ categoryFilter, setCategoryFilter }) => {
  return (
    <Dropdown>
      <DropdownTrigger className="hidden sm:flex">
        <Button endContent={<IconChevronDown />} variant="flat">
          Categoría {categoryFilter.size > 0 ? `(${categoryFilter.size})` : ''}
        </Button>
      </DropdownTrigger>
      <DropdownMenu
        disallowEmptySelection
        aria-label="Table Columns"
        closeOnSelect={false}
        selectedKeys={Array.from(categoryFilter) as string[]}
        selectionMode="multiple"
        onSelectionChange={(keys) => {
          const newCategoryFilter = new Set(categoryFilter);

          const selectedKeys = Array.isArray(keys) ? keys : Array.from(keys);

          selectedKeys.forEach((key) => {
            if (key) {
              newCategoryFilter.add(key);
            }
          });
          categoryFilter.forEach((key) => {
            if (!selectedKeys.includes(key)) {
              newCategoryFilter.delete(key);
            }
          });
          setCategoryFilter(newCategoryFilter);
        }}
      >
        {Object.values(ServiceCategories).map((category) => (
          <DropdownItem key={category} className="capitalize">
            {category}
          </DropdownItem>
        ))}
      </DropdownMenu>
    </Dropdown>
  );
};

export default DropdownFilter;
