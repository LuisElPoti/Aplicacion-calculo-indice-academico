'use server'

import { PrismaClient } from '@prisma/client';
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(req){
    try {
        const body = await req.json();
        const asignatura = body.asignatura;
        const seccion = body.seccion;

        const estudiante = await prisma.historico_academico.findMany({
            select: {
                estudiantes: {
                    select: {
                        id,
                        nombre,
                        carreras:{
                            select: {
                                nombre
                            }
                        }
                    }
                }
            },
            where: {
                secciones: {
                    id: seccion,
                    asignaturas: {
                        id: asignatura
                    }
                }
            }
        });
        return NextResponse.json( estudiante , { status: 200 }); // 200 OK

    } catch (error) {
        console.error('Error al obtener los estudiantes:', error); // 500 Internal Server Error
        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }
}