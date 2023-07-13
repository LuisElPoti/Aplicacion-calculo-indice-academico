'use server'

import { prisma } from '../_base';
import { NextResponse } from "next/server";

export async function POST(req){
    
    const { id_seccion } = await req.json();

    try {
        if (!id_seccion) {
            return NextResponse.json({ message: 'Uno o varios de los parámetros están vacíos' }, { status: 500 });
        } else {
            const seccion = await prisma.secciones.update({
                where: {
                    id: id_seccion
                },
                data: {
                    activo: false
                }
            });
            return NextResponse.json({ message: 'Seccion inhabilitada con éxito' }, { status: 200 });
        }
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: 'Error al inhabilitar el usuario' }, { status: 500 });
    }
}
