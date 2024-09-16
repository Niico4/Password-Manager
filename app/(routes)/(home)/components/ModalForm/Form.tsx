import {
  Button,
  Input,
  ModalFooter,
  Select,
  SelectItem,
  Textarea,
} from '@nextui-org/react';
import React, { FC } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { formSchema, IForm } from './FormSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { ServiceCategories } from './ServicesCategory';
import { z as zod } from 'zod';

interface Props {
  onClose: () => void;
  onSubmit: (values: zod.infer<typeof formSchema>) => void;
}

const Form: FC<Props> = ({ onClose, onSubmit }) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<IForm>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nameService: '',
      password: '',
      webSite: '',
      category: ServiceCategories.OTROS,
      additionalNotes: '',
    },
    mode: 'onBlur',
  });

  console.log(errors);

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
        required
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
        {...register('additionalNotes')}
        isInvalid={!!errors.additionalNotes}
        errorMessage={errors.additionalNotes?.message}
      />

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
