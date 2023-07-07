
import { PrismaClient } from '@prisma/client';
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(req) {
  try {
    const asignatura = req.nextUrl.searchParams.get("asignatura");
    console.log(asignatura);

    const Asignaturas = await prisma.asignaturas.findUnique({
      where: {
        id: parseInt(asignatura)
      },
      select: {
        id_area_academica: true
      }
    });

    const profesores = await prisma.profesores.findMany({
      where: {
        id_area_academica: Asignaturas.id_area_academica
      },
      select: {
        id: true,
        nombre: true,
      }
    });
    
    //const profesores = secciones.flatMap((seccion) => seccion.profesores);

    console.log(profesores);
    // Array de profesores únicos
    return NextResponse.json(profesores, { status: 200 }); // 200 OK

  } catch (error) {
    console.error('Error al obtener los profesores:', error); // 500 Internal Server Error
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
