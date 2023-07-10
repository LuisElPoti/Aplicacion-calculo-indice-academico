'use server'

import { prisma } from '../_base';
import { NextResponse } from "next/server";

export async function POST(req) {
    const { seccion, calificaciones } = await req.json();

    try {
        if (!seccion || !calificaciones) {
            return NextResponse.json({ message: 'Uno o varios de los parámetros están vacíos' }, { status: 500 });
        }
        else {
            let creditos = await prisma.secciones.findMany({
                select: {
                    asignaturas: {
                        select: { creditos: true }
                    }
                },
                where: {
                    id: seccion
                }
            })
            creditos = creditos[0]?.asignaturas?.creditos;
            for (let key in calificaciones) {
                if (calificaciones.hasOwnProperty(key)) { // to ensure that the key is not from the object's prototype chain
                    
                    const calificacion = await prisma.historico_academico.updateMany({
                        data: {
                            calificacion_numerica: parseFloat(calificaciones[key]),
                            calificacion_literal: calcularLetra(parseFloat(calificaciones[key])),
                            puntos_honor: puntosHonor(parseFloat(calificaciones[key]), parseFloat(creditos))
                        },
                        where: {

                            id_seccion: seccion,
                            estudiantes: {
                                is: { matricula: key }
                            }
                        }
                    })
                }
            }

            console.log("Calificaciones registradas con éxito");
            return NextResponse.json({ message: 'Calificaciones registradas con éxito' }, { status: 200 });
        }
    } catch (error) {
        console.error('Error al registrar la asignatura:', error);
        return NextResponse.json({ message: 'Error al registrar la asignatura' }, { status: 500 });
    }
}


function calcularLetra(calificacion) {
    if (calificacion >= 90) {
        return 'A';
    } else if (calificacion >= 85) {
        return 'B+';
    } else if (calificacion >= 80) {
        return 'B';
    } else if (calificacion >= 75) {
        return 'C+';
    } else if (calificacion >= 70) {
        return 'C-';
    } else if (calificacion >= 65) {
        return 'D+';
    } else if (calificacion >= 60) {
        return 'D-';
    }
    else {
        return 'F';
    }
}

function puntosHonor(calificacion, creditos) {
    if (calificacion >= 90) {
        return 4 * creditos;
    } else if (calificacion >= 85) {
        return 3.5 * creditos;
    } else if (calificacion >= 80) {
        return 3 * creditos;
    } else if (calificacion >= 75) {
        return 2.5 * creditos;
    } else if (calificacion >= 70) {
        return 2 * creditos;
    } else if (calificacion >= 65) {
        return 1.5 * creditos;
    } else if (calificacion >= 60) {
        return 1 * creditos;
    }
    else {
        return 0;
    }
}