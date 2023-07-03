import { PrismaClient } from '@prisma/client';
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(req) {
  try {

    const carrera = await prisma.carreras.findMany(); // SELECT * FROM carreras
    return NextResponse.json({ carrera }, { status: 200 }); // 200 OK

  } catch (error) {
    console.error('Error al obtener las carreras:', error); // 500 Internal Server Error
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
