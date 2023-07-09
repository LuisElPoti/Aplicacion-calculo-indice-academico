import { prisma } from '../_base';
import { NextResponse } from "next/server";

export async function POST(req){
    const{idSeccion, dia, horaInicio, horaFin, aula} = await req.json();
    console.log(idSeccion, dia, horaInicio, horaFin, aula);

    try{
        if( !dia || !horaInicio || !horaFin || !aula || !idSeccion){
            return NextResponse.json({ message: 'Uno o varios de los parámetros están vacíos' }, { status: 500 });
        }
        else{
            const horario = await prisma.horario_secciones.create({
                data: {
                    id_seccion: parseInt(idSeccion),
                    dia,
                    hora_inicio: parseInt(horaInicio),
                    hora_fin: parseInt(horaFin),
                    aula
                }
            })
            console.log("Horario registrado con éxito");
            return NextResponse.json( horario , { status: 200 }); // 200 OK
        }
    }
    catch (error) {
        console.error('Error al Crear el horario:', error); // 500 Internal Server Error
        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }
}