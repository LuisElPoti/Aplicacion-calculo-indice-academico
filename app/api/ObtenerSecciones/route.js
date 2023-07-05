'use server'

import { PrismaClient } from '@prisma/client';
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(req){
    try {
        const body = await req.json();
        const asignatura = body.asignatura;

        const seccion = await prisma.secciones.findMany({
            select: {
                id,
                numero,
            },
            where: {
                id_asignatura: asignatura
            }
        });
        return NextResponse.json( seccion , { status: 200 }); // 200 OK

    } catch (error) {
        console.error('Error al obtener las secciones:', error); // 500 Internal Server Error
        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }
}