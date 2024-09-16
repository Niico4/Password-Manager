import Title from '@/app/components/Shared/Title';
import React from 'react';
import ModalForm from './components/ModalForm/ModalForm';

const HomePage = () => {
  return (
    <div className="flex justify-between">
      <Title title="Todas Las Contraseñas Guardadas" />
      <ModalForm />
    </div>
  );
};

export default HomePage;
