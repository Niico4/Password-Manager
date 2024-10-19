import React from 'react';

import Title from '@/app/components/shared/Title';

import FormGenerator from './FormGenerator';

const PasswordGeneratorPage = () => {
  return (
    <>
      <Title title="Genera tu Contraseña" className="mt-6" />
      <FormGenerator />
    </>
  );
};

export default PasswordGeneratorPage;
