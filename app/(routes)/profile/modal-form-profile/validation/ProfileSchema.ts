import { z } from 'zod';

export const profileSchema = z.object({
  name: z
    .string()
    .min(3, {
      message:
        '¡El nombre es muy corto! Asegúrate de usar al menos 3 caracteres.',
    })
    .max(30, {
      message:
        'El nombre es demasiado largo. Mantenlo en 30 caracteres o menos.',
    })
    .regex(/^[A-Za-z\s]+$/, {
      message: 'El nombre solo debe contener letras y espacios.',
    }),

  lastName: z
    .string()
    .min(3, {
      message:
        '¡El apellido es muy corto! Asegúrate de usar al menos 3 caracteres.',
    })
    .max(30, {
      message:
        'El apellido es demasiado largo. Mantenlo en 30 caracteres o menos.',
    })
    .regex(/^[A-Za-z\s]+$/, {
      message: 'El apellido solo debe contener letras y espacios.',
    }),

  email: z.string().email({ message: 'El correo electrónico no es válido' }),

  username: z
    .string()
    .min(3, {
      message: 'El nombre de usuario debe tener al menos 3 caracteres.',
    })
    .max(15, {
      message: 'El nombre de usuario no puede superar los 15 caracteres.',
    }),

  profileImage: z.string().optional(),

  id: z.string(),
});

export type ProfileType = z.infer<typeof profileSchema>;
