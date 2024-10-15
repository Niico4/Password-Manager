import { NextResponse } from 'next/server';

import { db } from '@/utils/prisma';

export const DELETE = async (
  req: Request,
  { params }: { params: { id: string } }
) => {
  try {
    const id = params.id;

    if (!id) {
      return new NextResponse('ID no válido o no proporcionado', {
        status: 400,
      });
    }

    const deletedPassword = await db.password.delete({
      where: { id },
    });

    if (!deletedPassword) {
      return new NextResponse('No se encontró la contraseña para eliminar', {
        status: 404,
      });
    }

    return NextResponse.json(deletedPassword);
  } catch (error) {
    console.error('Error al eliminar contraseña:', error);
    return new NextResponse('Error interno del servidor', { status: 500 });
  }
};
