import { hash } from 'bcrypt';
import { NextResponse } from 'next/server';

import { db } from '@/utils/prisma';

export async function POST(req: Request) {
  try {
    const { email, password, username, lastName, name } = await req.json();
    const hashedPassword = await hash(password, 10);

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Ingresa tu correo electrónico y contraseña para continuar.' },
        { status: 400 }
      );
    }

    const existingUser = await db.user.findUnique({ where: { email } });
    if (existingUser) {
      return NextResponse.json(
        { error: 'El correo electrónico ya está en uso.' },
        { status: 400 }
      );
    }

    const newUser = await db.user.create({
      data: {
        email,
        lastName,
        name,
        password: hashedPassword,
        username,
      },
    });

    return NextResponse.json(newUser);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: 'Error al crear el usuario' },
      { status: 500 }
    );
  }
}
