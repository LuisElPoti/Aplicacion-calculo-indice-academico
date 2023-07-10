'use server'

import { prisma } from '../_base';
import { NextResponse } from "next/server";

export async function GET(req) {
    try {
        const area = req.nextUrl.searchParams.get("area");
        console.log(area);

        const asignatura = await prisma.asignaturas.findMany(
            {
               
                where: {
                    areas_academicas:{
                        descripcion: area
                    }
                }

            }
        );
        return NextResponse.json(asignatura, { status: 200 }); // 200 OK

    } catch (error) {
        console.error('Error al obtener las asignaturas:', error); // 500 Internal Server Error
        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }
}