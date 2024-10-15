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
    console.error('Error interno del servidor', error);
    return new NextResponse('Error interno del servidor', { status: 500 });
  }
};
