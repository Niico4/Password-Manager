import { z as zod } from 'zod';
import { ServiceCategories } from './ServicesCategory';

export const formSchema = zod.object({
  nameService: zod.string().min(3, {
    message: 'El nombre del servicio debe tener al menos 3 caracteres.',
  }),
  username: zod.string().min(3, {
    message: 'El nombre de usuario debe tener al menos 3 caracteres.',
  }),
  password: zod
    .string()
    .min(6, { message: 'La contraseña debe tener al menos 6 caracteres.' }),
  webSite: zod
    .string()
    .url({
      message: 'Ingrese una URL válida (por ejemplo, http://ejemplo.com).',
    })
    .optional(),
  category: zod
    .nativeEnum(ServiceCategories, {
      message: 'La categoría seleccionada no es válida.',
    })
    .optional(),

  additionalNotes: zod
    .string()
    .max(500, {
      message: 'Las notas adicionales no pueden exceder los 500 caracteres.',
    })
    .optional(),
});

export type IForm = zod.infer<typeof formSchema>;
