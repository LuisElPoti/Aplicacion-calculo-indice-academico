'use server'
import { prisma } from '../_base';
import { NextResponse } from "next/server";

export async function POST(req){
    const{idSeccion, idEstudiante} = await req.json();
    console.log(idSeccion, idEstudiante);

    try {
        const estudiante = await prisma.estudiantes.findUnique({
            select: {
                id: true,
            },
            where: {
                matricula: idEstudiante
            }
        })
        const historico = await prisma.historico_academico.create({
            data: {
                id_estudiante: estudiante.id,
                id_seccion: parseInt(idSeccion),
                calificacion_numerica: 0,
                calificacion_literal: "",
                puntos_honor: 0,
                id_estado_historico: 1
            }
        });
        console.log("Historial registrado con éxito");
        return NextResponse.json( historico , { status: 200 }); // 200 OK
    } catch (error) {
        console.error('Error al Crear el historial:', error); // 500 Internal Server Error
        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }
    
}