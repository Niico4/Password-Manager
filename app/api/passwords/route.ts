import { db } from '@/utils/prisma';
import { NextResponse } from 'next/server';

export const POST = async (req: Request) => {
  try {
    const { nameService, password, webSite, details, userId, userName } =
      await req.json();

    const newPassword = await db.password.create({
      data: {
        details,
        nameService,
        password,
        userId,
        userName,
        webSite,
      },
    });

    return NextResponse.json(newPassword);
  } catch (error) {
    console.error(error);
    return new NextResponse('Internal Error', { status: 500 });
  }
};
