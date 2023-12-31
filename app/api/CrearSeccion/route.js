import { prisma } from '../_base';
import { NextResponse } from "next/server";


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
                    id_asignatura: parseInt(asignatura),
                    id_periodo: 1
                }
            })

            const lastNumero = lastSeccion ? parseInt(lastSeccion.numero) : 0
            const nuevoNumero = lastNumero + 1

            const seccion = await prisma.secciones.create({
                data: {
                    numero: nuevoNumero,
                    capacidad: parseInt(capacidad),
                    id_asignatura: parseInt(asignatura),
                    id_profesor: parseInt(profesor),
                    cupo: parseInt(cupo),
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