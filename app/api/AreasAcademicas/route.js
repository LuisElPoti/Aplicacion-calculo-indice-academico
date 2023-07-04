import { PrismaClient } from '@prisma/client';
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(req) {
  try {
    const areas = await prisma.areas_academicas.findMany(); // SELECT * FROM areas_academicas
    return NextResponse.json(areas, { status: 200 }); // 200 OK

  } catch (error) {
    console.error('Error al obtener las areas academicas:', error); // 500 Internal Server Error
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
