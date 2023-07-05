'use server'

import { asignaturas } from '@/prisma/client';
import { PrismaClient } from '@prisma/client';
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(req){
    try {
        const body = await req.json();
        const profesor = body.profesor;

        const asignatura = await prisma.secciones.findMany({
            select: {
                asignaturas: {
                    select: {
                        id,
                        nombre
                    }
                }
            },
            where: {
                profesores: {
                    id: profesor
                }
            }
        });
        return NextResponse.json( asignatura , { status: 200 }); // 200 OK

    } catch (error) {
        console.error('Error al obtener las asignaturas:', error); // 500 Internal Server Error
        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }
}