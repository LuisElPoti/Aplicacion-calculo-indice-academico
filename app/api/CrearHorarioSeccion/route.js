import { PrismaClient } from '@prisma/client';
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(req){
    const{idseccion, dia, horaInicio, horaFin, aula} = await req.json();

    try{
        if( !dia || !horaInicio || !horaFin || !aula){
            return NextResponse.json({ message: 'Uno o varios de los parámetros están vacíos' }, { status: 500 });
        }
        else{
            const horario = await prisma.horario_secciones.create({
                data: {
                    id_seccion: idseccion,
                    dia,
                    hora_inicio: horaInicio,
                    hora_fin: horaFin,
                    aula
                }
            })
            console.log("Horario registrado con éxito");
            return NextResponse.json( seccion , { status: 200 }); // 200 OK
        }
    }
    catch (error) {
        console.error('Error al Crear el horario:', error); // 500 Internal Server Error
        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }
}