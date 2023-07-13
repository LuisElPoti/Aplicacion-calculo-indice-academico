'use server'

import { prisma } from '../_base';
import { NextResponse } from "next/server";

export async function GET(req) {
    try {
        let resultado = await prisma.secciones.findMany({
            select: {
                id: true,
                numero: true,
                profesores: {
                    select: {
                        nombre: true,
                        apellido: true
                    }
                },
                asignaturas: {
                    select: {
                        nombre: true,
                        clave: true,
                        areas_academicas: {
                            select: {
                                nombre: true
                            }
                        }
                    }
                }

            },
            where: {
                activo: true
            }
        });



        return NextResponse.json(resultado, { status: 200 }); // 200 OK

    } catch (error) {
        console.error('Error al obtener los estudiantes:', error); // 500 Internal Server Error
        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }
}