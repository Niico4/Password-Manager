import { z } from 'zod';

import { ServiceCategories } from '../../../../../utils/enum/ServicesCategory';

export const passwordSchema = z.object({
  nameService: z
    .string()
    .min(3, {
      message:
        '¡El nombre del servicio es muy corto! Asegúrate de usar al menos 3 caracteres.',
    })
    .max(30, {
      message:
        'El nombre del servicio es demasiado largo. Mantenlo en 30 caracteres o menos.',
    }),

  username: z
    .string()
    .min(3, {
      message:
        'Tu nombre de usuario debe tener al menos 3 caracteres para ser válido.',
    })
    .max(15, {
      message:
        'Tu nombre de usuario no puede superar los 15 caracteres. ¡Hazlo más breve!',
    }),

  password: z.string().min(6, {
    message:
      'La contraseña es demasiado corta. Usa al menos 6 caracteres para mayor seguridad.',
  }),

  webSite: z
    .string()
    .url({
      message:
        'El formato de la URL no es válido. Asegúrate de incluir "http://" o "https://".',
    })
    .optional(),

  category: z
    .nativeEnum(ServiceCategories, {
      message: 'Por favor, selecciona una categoría válida de la lista.',
    })
    .optional(),

  details: z
    .string()
    .max(500, {
      message:
        'Demasiado texto en los detalles. No puedes exceder los 500 caracteres.',
    })
    .optional(),
  userId: z.string(),
  isFavorite: z.boolean().optional().default(false),
});

export type PasswordType = z.infer<typeof passwordSchema>;
