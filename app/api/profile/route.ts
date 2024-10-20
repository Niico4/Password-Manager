import { NextResponse } from 'next/server';

import { db } from '@/utils/prisma';

export const PATCH = async (req: Request) => {
  try {
    const { name, email, profileImage, username, id } = await req.json();

    if (!name || !email || !profileImage || !username || !id) {
      return new Response('Error al recibir los datos', { status: 401 });
    }

    const profile = await db.user.update({
      where: {
        id,
      },
      data: {
        email,
        name,
        profileImage,
        username,
      },
    });

    return NextResponse.json(profile);
  } catch (error) {
    console.error('Error interno del servidor', error);
    return new NextResponse('Error interno del servidor', { status: 500 });
  }
};
