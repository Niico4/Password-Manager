'use client';
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Input,
  Tooltip,
} from '@nextui-org/react';
import { IconCopy, IconKey, IconRefresh } from '@tabler/icons-react';
import React, { useCallback, useEffect, useState } from 'react';

import { handleCopyPassword } from '@/utils/passwordsHandlers';
import { generateCustomPassword } from '@/utils/generateCustomPassword';

import { FormInitialValues } from '../../interfaces/PasswordGenerator';

import PasswordGenerator from './password-generator/PasswordGenerator';

const FormGenerator = () => {
  const [initialValues, setInitialValues] = useState<FormInitialValues>({
    value: 8,
    isMayus: false,
    isMinus: false,
    isNumbers: false,
    isSpecialCharacters: false,
  });
  const [customPassword, setCustomPassword] = useState('');

  const { value, isMayus, isMinus, isNumbers, isSpecialCharacters } =
    initialValues;

  useEffect(() => {
    if (isMayus || isMinus || isNumbers || isSpecialCharacters) {
      const newPassword = generateCustomPassword(
        value,
        isMayus,
        isMinus,
        isNumbers,
        isSpecialCharacters
      );
      setCustomPassword(newPassword);
    }
  }, [isMayus, isMinus, isNumbers, isSpecialCharacters, value]);

  const handleRegeneratePassword = () => {
    const newPassword = generateCustomPassword(
      value,
      isMayus,
      isMinus,
      isNumbers,
      isSpecialCharacters
    );
    setCustomPassword(newPassword);
  };

  const handleChange = useCallback((name: string, value: boolean) => {
    setInitialValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  }, []);

  return (
    <Card className="w-1/3 h-auto mx-auto my-16">
      <CardHeader className="mb-4 gap-4 justify-center">
        <Input
          startContent={<IconKey stroke={1} />}
          placeholder="Contraseña"
          value={customPassword}
          readOnly
        />
        <div className="flex items-center gap-2">
          <Tooltip content="Copiar Contraseña" color="primary">
            <Button
              aria-label="Copiar contraseña"
              isIconOnly
              startContent={<IconCopy />}
              size="sm"
              variant="light"
              color="primary"
              onClick={() => handleCopyPassword(customPassword, 'Creada')}
            />
          </Tooltip>

          <Tooltip content="Generar nueva contraseña" color="primary">
            <Button
              aria-label="Generar contraseña"
              isIconOnly
              startContent={<IconRefresh />}
              size="sm"
              variant="light"
              color="primary"
              onClick={handleRegeneratePassword}
            />
          </Tooltip>
        </div>
      </CardHeader>
      <CardBody className="flex flex-col items-center">
        <form action="" className="flex flex-col gap-6 mb-8">
          <PasswordGenerator
            isMayus={isMayus}
            isMinus={isMinus}
            isNumbers={isNumbers}
            isSpecialCharacters={isSpecialCharacters}
            setIsMayus={(value) => handleChange('isMayus', value)}
            setIsMinus={(value) => handleChange('isMinus', value)}
            setIsNumbers={(value) => handleChange('isNumbers', value)}
            setIsSpecialCharacters={(value) =>
              handleChange('isSpecialCharacters', value)
            }
            value={value}
            setValue={(newValue) =>
              setInitialValues((prev) => ({
                ...prev,
                value: newValue as number,
              }))
            }
          />
        </form>
      </CardBody>
    </Card>
  );
};

export default FormGenerator;
