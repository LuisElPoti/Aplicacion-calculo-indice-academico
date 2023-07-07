import { PrismaClient } from '@prisma/client';
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(req) {
  try {
    const profesor = await prisma.profesores.findMany(); // SELECT * FROM carreras
    return NextResponse.json( profesor , { status: 200 }); // 200 OK

  } catch (error) {
    console.error('Error al obtener los profesores:', error); // 500 Internal Server Error
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
