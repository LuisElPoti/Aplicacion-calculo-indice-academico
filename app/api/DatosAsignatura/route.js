'use server'

import { prisma } from '../_base';
import { NextResponse } from "next/server";

export async function GET(req) {
    try {
        const clave = req.nextUrl.searchParams.get("clave")
        const asignatura = await prisma.asignaturas.findMany(
            {
                select: {
                    id: true,
                    clave: true,
                    nombre: true,
                    creditos: true,
                    areas_academicas: {
                        select: {
                            nombre: true,
                            id: true
                        }
                    }
                },
                where: {
                    AND:[
                        {activo: true},
                        {clave: clave}
                    ]
                    
                }
            }
        );
        return NextResponse.json(asignatura, { status: 200 }); // 200 OK

    } catch (error) {
        console.error('Error al obtener la asignatura:', error); // 500 Internal Server Error
        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }
}