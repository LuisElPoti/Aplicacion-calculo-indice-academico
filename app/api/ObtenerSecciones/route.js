'use server'

import { PrismaClient } from '@prisma/client';
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(req){
    try {
        const asignatura = req.nextUrl.searchParams.get("asignatura")
        console.log(req.nextUrl.searchParams.get("asignatura"));

        const seccion = await prisma.secciones.findMany({
            select: {
                id: true,
                numero: true,
            },
            where: {
                id_asignatura: parseInt(asignatura) 
            }
        });
        return NextResponse.json( seccion , { status: 200 }); // 200 OK

    } catch (error) {
        console.error('Error al obtener las secciones:', error); // 500 Internal Server Error
        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }
}