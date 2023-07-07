'use server'

import { PrismaClient } from '@prisma/client';
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(req){
    
    const { clave } = await req.json();

    try {
        if (!clave) {
            return NextResponse.json({ message: 'Uno o varios de los parámetros están vacíos' }, { status: 500 });
        } else {
            const asignatura = await prisma.asignaturas.update({
                where: {
                    clave: clave
                },
                data: {
                    activo: false
                }
            });
            return NextResponse.json({ message: 'Asignatura inhabilitada con éxito' }, { status: 200 });
        }
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: 'Error al inhabilitar el usuario' }, { status: 500 });
    }
}
