import { compare } from 'bcrypt';
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

import { db } from '@/utils/prisma';

type Credentials = { email: string; password: string };
type UserResponse = { id: string; email: string; name: string };

const validateCredentials = async (
  credentials: Credentials | undefined
): Promise<UserResponse> => {
  if (!credentials?.email || !credentials.password) {
    throw new Error(
      'Ingresa tu correo electrónico y contraseña para continuar.'
    );
  }
  const user = await db.user.findUnique({
    where: { email: credentials.email },
  });

  if (!user || !(await compare(credentials.password, user.password))) {
    throw new Error('Verifica tu correo y contraseña.');
  }

  return { id: user.id, email: user.email, name: user.username };
};

const handler = NextAuth({
  session: {
    strategy: 'jwt',
  },
  pages: {
    signIn: '/auth/sign-in',
  },
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        try {
          return await validateCredentials(credentials);
        } catch (error) {
          if (error instanceof Error) {
            console.error('Error al autorizar usuario:', error.message);
            throw new Error(error.message);
          }
          return null;
        }
      },
    }),
  ],
});

export { handler as GET, handler as POST };
