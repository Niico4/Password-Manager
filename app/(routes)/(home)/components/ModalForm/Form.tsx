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
import React, { FC } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';

import { ServiceCategories } from './enum/ServicesCategory';
import { passwordSchema, IForm } from './validation/PasswordSchema';
import { IconHeartFilled } from '@tabler/icons-react';

interface Props {
  onClose: () => void;
  onSubmit: (values: z.infer<typeof passwordSchema>) => void;
  userId: string;
}

const IconHeartFilledWrapper = (props: any) => {
  const { isSelected, isIndeterminate, disableAnimation, ...rest } = props;

  return <IconHeartFilled {...rest} />;
};

const Form: FC<Props> = ({ onClose, onSubmit, userId }) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    setValue,
  } = useForm<IForm>({
    resolver: zodResolver(passwordSchema),
    defaultValues: {
      category: ServiceCategories.OTROS,
      details: '',
      isFavorite: false,
      nameService: '',
      password: '',
      userId,
      username: '',
      webSite: '',
    },
    mode: 'all',
  });

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
        icon={<IconHeartFilledWrapper />}
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
          Crear
        </Button>
      </ModalFooter>
    </form>
  );
};

export default Form;
