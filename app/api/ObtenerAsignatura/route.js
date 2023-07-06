'use server'

import { PrismaClient } from '@prisma/client';
import { NextResponse } from "next/server";


const prisma = new PrismaClient();

export async function GET(req){
    try {
        const profesor = req.nextUrl.searchParams.get("profesor")
        console.log(req.nextUrl.searchParams.get("profesor"));

        const asignatura = await prisma.asignaturas.findMany({
            select: {
                id: true,
                nombre: true
            },
            where: {
                secciones: {
                  some: {
                    profesores: {
                      is: {
                        matricula: profesor
                      }
                    }
                  }
                }
            }
        });
        console.log(asignatura)
        return NextResponse.json( asignatura , { status: 200 }); // 200 OK

    } catch (error) {
        console.error('Error al obtener las asignaturas:', error); // 500 Internal Server Error
        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }
}