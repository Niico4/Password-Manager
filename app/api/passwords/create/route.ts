import { NextResponse } from 'next/server';

import { db } from '@/utils/prisma';

export const POST = async (req: Request) => {
  try {
    const {
      category,
      details,
      isFavorite,
      nameService,
      password,
      userId,
      username,
      webSite,
    } = await req.json();

    const newPassword = await db.password.create({
      data: {
        category,
        details,
        isFavorite,
        nameService,
        password,
        userId,
        username,
        webSite,
      },
    });

    return NextResponse.json(newPassword);
  } catch (error) {
    console.error('Error al crear contraseña', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
};
