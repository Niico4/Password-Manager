'use client';

import { Tab, Tabs } from '@nextui-org/react';
import React, { useState } from 'react';
import FormSignIn from './FormSignIn';
import FormSignUp from './FormSignUp';

const TabsForm = () => {
  const [selected, setSelected] = useState<string>('sign-in');

  const handleSelectionChange = (key: React.Key) => {
    setSelected(String(key));
  };
  return (
    <Tabs
      fullWidth
      size="lg"
      aria-label="Tabs form"
      selectedKey={selected}
      onSelectionChange={handleSelectionChange}
      variant="light"
      classNames={{
        cursor: 'w-full bg-white/10',
        tabContent: 'group-data-[selected=true]:text-blue-100',
      }}
    >
      <Tab key="sign-in" title="Iniciar Sesión">
        <FormSignIn />
      </Tab>
      <Tab key="sign-up" title="Registrarse">
        <FormSignUp />
      </Tab>
    </Tabs>
  );
};

export default TabsForm;
