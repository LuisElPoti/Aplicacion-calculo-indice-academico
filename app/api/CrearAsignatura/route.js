'use server'

import { PrismaClient } from '@prisma/client';
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(req){
    const {clave, nombre, creditos, area_academica} = await req.json();

    try {
        if (!clave || !nombre || !creditos || !area_academica) {
            return NextResponse.json({ message: 'Uno o varios de los parámetros están vacíos' }, { status: 500 });
        }
        else{
            const asignatura = await prisma.asignaturas.create({
                data: {
                    clave,
                    creditos,
                    nombre,
                    id_area_academica: area_academica,
                    activo: true
                }
            })
            console.log("Asignatura registrada con éxito");
            return NextResponse.json({ message: 'Asignatura registrada con éxito' }, { status: 200 });
        }
    } catch (error) {
        console.error('Error al registrar la asignatura:', error);
        return NextResponse.json({ message: 'Error al registrar la asignatura' }, { status: 500 });
    }
}