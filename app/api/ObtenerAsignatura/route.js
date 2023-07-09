'use server'

import { prisma } from '../_base';
import { NextResponse } from "next/server";


export async function GET(req){
    try {
        const profesor = req.nextUrl.searchParams.get("profesor")
        const trimestre = parseInt(process.env.TRIMESTRE_ACTUAL)
        const anio = parseInt(process.env.YEAR_ACTUAL)

        const asignatura = await prisma.asignaturas.findMany({
            select: {
                id: true,
                nombre: true,
                clave: true,
            },
            where: {
                secciones: {
                  some:{
                    profesores: {
                      is: {
                        matricula: profesor
                      }
                    },
                    periodos:{
                      is:{
                        id_trimestre:trimestre
                      }
                    },
                    periodos:{
                      is:{
                        a_o:anio
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