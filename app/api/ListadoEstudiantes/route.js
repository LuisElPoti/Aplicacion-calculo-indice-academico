'use server'

import { prisma } from '../_base';
import { NextResponse } from "next/server";

export async function GET(req){
    try {
        const asignatura = req.nextUrl.searchParams.get("asignatura")
        const seccion = req.nextUrl.searchParams.get("seccion")


        const estudiante = await prisma.historico_academico.findMany({
            select: {
                estudiantes: {
                    select: {
                        matricula: true,
                        nombre: true,
                        carreras:{
                            select: {
                                nombre: true
                            }
                        }
                    }
                }
            },
            where: {
                secciones: {
                    id: parseInt(seccion),
                    asignaturas: {
                        id: parseInt(asignatura)
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