import { zodResolver } from '@hookform/resolvers/zod';
import {
  Button,
  Checkbox,
  Input,
  ModalFooter,
  Select,
  SelectItem,
  Textarea,
} from '@nextui-org/react';
import { Password } from '@prisma/client';
import { IconHeartFilled } from '@tabler/icons-react';
import React, { FC, useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';

import { validateCategory } from '@/utils/validatePasswordCategory';

import IconWrapper from '../../../components/shared/IconWrapper';
import { ServiceCategories } from '../../../../utils/enum/ServicesCategory';
import {
  passwordSchema,
  PasswordType,
} from '../../../../utils/validation/PasswordSchema';

interface FormProps {
  editingPassword: Password | null;

  onClose: () => void;
  onSubmit: (values: PasswordType) => void;
  userId: string;
}

const Form: FC<FormProps> = ({
  onClose,
  onSubmit,
  userId,
  editingPassword,
}) => {
  const {
    control,
    formState: { errors },
    handleSubmit,
    register,
    reset,
    setValue,
  } = useForm<PasswordType>({
    resolver: zodResolver(passwordSchema),
    defaultValues: {
      category: ServiceCategories.OTHERS,
      details: '',
      isFavorite: false,
      nameService: '',
      password: '',
      userId,
      username: '',
      webSite: '',
      ...(editingPassword && {
        category: validateCategory(editingPassword.category),
        details: editingPassword.details || '',
        isFavorite: editingPassword.isFavorite,
        nameService: editingPassword.nameService,
        password: editingPassword.password,
        username: editingPassword.username,
        webSite: editingPassword.webSite || '',
        userId: editingPassword.userId,
      }),
    },
    mode: 'all',
  });

  useEffect(() => {
    if (editingPassword) {
      reset();
    }
  }, [editingPassword, reset]);

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
      <div className="flex gap-4">
        <Input
          type="text"
          label="Nombre del servicio"
          isRequired
          variant="bordered"
          {...register('nameService')}
          isInvalid={!!errors.nameService}
          errorMessage={errors.nameService?.message}
        />

        <Input
          type="text"
          label="Usuario"
          isRequired
          variant="bordered"
          {...register('username')}
          isInvalid={!!errors.username}
          errorMessage={errors.username?.message}
        />
      </div>
      <Input
        label="Contraseña"
        type="password"
        isRequired
        variant="bordered"
        {...register('password')}
        isInvalid={!!errors.password}
        errorMessage={errors.password?.message}
      />

      <Input
        type="text"
        label="URL del sitio web o plataforma"
        variant="bordered"
        {...register('webSite')}
        isInvalid={!!errors.webSite}
        errorMessage={errors.webSite?.message}
      />

      <Controller
        name="category"
        control={control}
        render={({ field }) => (
          <Select
            label="Categoría"
            variant="bordered"
            value={field.value}
            onChange={field.onChange}
          >
            {Object.values(ServiceCategories).map((category) => (
              <SelectItem key={category} value={category}>
                {category}
              </SelectItem>
            ))}
          </Select>
        )}
      />

      <Textarea
        label="Notas adicionales"
        variant="bordered"
        {...register('details')}
        isInvalid={!!errors.details}
        errorMessage={errors.details?.message}
      />

      <Checkbox
        icon={<IconWrapper icon={IconHeartFilled} />}
        {...register('isFavorite')}
        onChange={(e) => setValue('isFavorite', e.target.checked)}
      >
        Añadir a Favorito
      </Checkbox>

      <ModalFooter>
        <Button color="danger" variant="flat" onPress={onClose}>
          Cancelar
        </Button>
        <Button type="submit" color="primary">
          {editingPassword ? 'Guardar' : 'Crear'}
        </Button>
      </ModalFooter>
    </form>
  );
};

export default Form;
