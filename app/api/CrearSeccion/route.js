import { areas_academicas } from '@/prisma/client';
import { PrismaClient } from '@prisma/client';
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(req) {
    const{capacidad, asignatura, profesor, cupo} = await req.json();

    try {
        if(!asignatura || !profesor || !cupo){
            return NextResponse.json({ message: 'Uno o varios de los parámetros están vacíos' }, { status: 500 });
        }
        else{
            const lastSeccion = await prisma.secciones.findFirst({
                orderBy: {numero: 'desc'},
                where: {
                    id_asignatura: asignatura,
                    id_periodo: 1
                }
            })

            const lastNumero = lastSeccion ? parseInt(lastSeccion.numero) : 0
            const nuevoNumero = lastNumero + 1

            const seccion = await prisma.secciones.create({
                data: {
                    numero: nuevoNumero,
                    capacidad,
                    id_asignatura: asignatura,
                    id_profesor: profesor,
                    cupo,
                    id_periodo: 1
                }
            })
            console.log("Seccion registrada con éxito");
            return NextResponse.json( seccion , { status: 200 }); // 200 OK
        }
        

    } catch (error) {
        console.error('Error al Crear la sección:', error); // 500 Internal Server Error
        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }
}