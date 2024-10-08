import { z } from 'zod';

export const signUpSchema = z
  .object({
    name: z
      .string()
      .min(3, { message: 'El nombre debe tener al menos 3 caracteres.' })
      .max(20, { message: 'El nombre no puede tener más de 20 caracteres.' }),
    lastName: z
      .string()
      .min(3, { message: 'El apellido debe tener al menos 3 caracteres.' })
      .max(20, { message: 'El apellido no puede tener más de 20 caracteres.' }),
    username: z
      .string()
      .min(3, {
        message: 'El nombre de usuario debe tener al menos 3 caracteres.',
      })
      .max(10, {
        message: 'El nombre de usuario no puede tener más de 10 caracteres.',
      })
      .regex(/^[a-zA-Z0-9_]+$/, {
        message:
          'El nombre de usuario solo puede contener letras, números y guiones bajos.',
      }),
    email: z
      .string()
      .email({ message: 'Introduce un correo electrónico válido.' }),
    password: z
      .string()
      .min(8, { message: 'La contraseña debe tener al menos 8 caracteres.' })
      .max(20, {
        message: 'La contraseña no puede exceder los 20 caracteres.',
      })
      .regex(/[A-Z]/, {
        message: 'La contraseña debe incluir al menos una letra mayúscula.',
      })
      .regex(/[a-z]/, {
        message: 'La contraseña debe incluir al menos una letra minúscula.',
      })
      .regex(/[0-9]/, {
        message: 'La contraseña debe incluir al menos un número.',
      })
      .regex(/[\W_]/, {
        message: 'La contraseña debe incluir al menos un símbolo.',
      }),
    confirmPassword: z
      .string()
      .min(8, { message: 'Debes confirmar tu contraseña.' }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Las contraseñas deben coincidir',
    path: ['confirmPassword'],
  });

export type IFormSignUp = z.infer<typeof signUpSchema>;
