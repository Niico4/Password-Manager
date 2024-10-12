import { NextResponse } from 'next/server';

import { db } from '@/utils/prisma';

export const PUT = async (
  req: Request,
  { params }: { params: { id: string } }
) => {
  try {
    const id = params.id;
    const updatedData = await req.json();

    const updatedPassword = await db.password.update({
      where: { id },
      data: updatedData,
    });

    return NextResponse.json(updatedPassword);
  } catch (error) {
    console.error('Error al actualizar contraseña:', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
};
