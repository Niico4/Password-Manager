import { Password } from '@prisma/client';

export const countPasswords = (totalPasswords: Password[]) => {
  const categoryCount: Record<string, number> = {};
  let favoriteCount = 0;

  const passwordRepeatCount: Record<string, number> = totalPasswords.reduce(
    (acc, { password, category, isFavorite }) => {
      // Contar contraseñas repetidas
      if (password) {
        acc[password] = (acc[password] || 0) + 1;
      }

      // Contar contraseñas por categoría
      categoryCount[category ?? 'Otros Servicios'] =
        (categoryCount[category ?? 'Otros Servicios'] || 0) + 1;

      // Contar contraseñas favoritas
      if (isFavorite) {
        favoriteCount++;
      }

      return acc;
    },
    {} as Record<string, number>
  );

  const repeatedPasswords = Object.values(passwordRepeatCount).filter(
    (count) => count > 1
  ).length;
  const totalPasswordsCount = totalPasswords.length;

  return {
    categoryCount,
    favoriteCount,
    repeatedPasswords,
    totalPasswordsCount,
  };
};
