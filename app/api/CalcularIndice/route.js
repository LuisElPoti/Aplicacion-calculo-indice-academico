'use server'

import { prisma } from '../_base';
import { NextResponse } from "next/server";


export async function POST(req) {

    const body = await req.json();

    const id_usuario = body.id_usuario;

    try {
        if(!id_usuario) return NextResponse.json({message: 'Uno o varios de los parametros estan vacios'}, {status: 500})
        else{
            const resultado = await prisma.$queryRaw`CALL CalcularIndiceEstudiante(${id_usuario})`;
            return NextResponse.json(resultado, { status: 200 });
        }

    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: 'Error al crear el usuario' }, { status: 500 });
    }
}
