// api/Usuarios/VerificarDocumento.js
'use server'
import { prisma } from '../_base';
import { NextResponse } from "next/server";

export async function POST(req) {
  const { documento } = await req.json();

  try {
    const existEstudiante = await prisma.estudiantes.findFirst({
      where: {
        documento: documento,
      },
    });

    const existProfesor = await prisma.profesores.findFirst({
      where: {
        documento: documento,
      },
    });

    const existAdministrador = await prisma.administradores.findFirst({
      where: {
        documento: documento,
      },
    });

    const documentoEnUso = existEstudiante || existProfesor || existAdministrador;

    return NextResponse.json({ enUso: documentoEnUso }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Error al verificar el documento' }, { status: 500 });
  }
}
