'use server'

import { PrismaClient } from '@prisma/client';
import { NextResponse } from "next/server";


const prisma = new PrismaClient();

export async function GET(req) {
    try {
        const asignatura = await prisma.asignaturas.findMany(
            {
                select: {
                    clave: true,
                    nombre: true,
                    creditos: true,
                    areas_academicas: {
                        select: {
                            nombre: true
                        }
                    }
                }
            }
        );
        console.log(asignatura)
        return NextResponse.json(asignatura, { status: 200 }); // 200 OK

    } catch (error) {
        console.error('Error al obtener las asignaturas:', error); // 500 Internal Server Error
        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }
}