'use server'

import { PrismaClient } from '@prisma/client';
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(req){
    try {
        const carreras = await prisma.carreras.findMany();
        const tipoDocumento = await prisma.tipo_documento.findMany();
        const areasAcademicas = await prisma.areas_academicas.findMany();

        return {
          body: {
            carreras,
            tipoDocumento,
            areasAcademicas
          }
        };
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: 'Error al obtener las carreras y áreas académicas' }, { status: 500 });
    }
}

export async function POST(req){
    const { nombre, apellido, telefono, dirección, contraseña, tipo_documento, documento, carrera, area_academica, tipo_usuario } = req.body;

    try {
        if (!nombre || !apellido || !telefono || !dirección || !contraseña || !tipo_documento || !documento || !tipo_usuario) {
            return NextResponse.json({ message: 'Uno o varios de los parámetros están vacíos' }, { status: 500 });
        } else {
            let usuario = tipo_usuario;
            switch (usuario) {
                case 'estudiante':
                    if (!carrera) {
                        return NextResponse.json({ message: 'Uno o varios de los parámetros están vacíos' }, { status: 500 });
                    } else {
                        const lastEstudiante = await prisma.estudiantes.findFirst({
                            orderBy: { matricula: 'desc' },
                        });

                        const lastMatricula = lastEstudiante ? parseInt(lastEstudiante.matricula) : 1100000;
                        const nuevaMatricula = (lastMatricula + 1).toString();

                        const correo = `${nuevaMatricula}@gradehub.edu.do`;

                        const indice = 0;
                        const estudiante = await prisma.estudiantes.create({
                            data: {
                                nombre,
                                apellido,
                                indice_general: indice,
                                carrera,
                                telefono,
                                dirección,
                                contraseña,
                                correo,
                                tipo_documento,
                                documento,
                                matricula: nuevaMatricula,
                                activo: true
                            }
                        });

                        console.log("Estudiante registrado con éxito");
                        return NextResponse.json({ message: 'Estudiante registrado con éxito' }, { status: 200 });
                    }

                case 'profesor':
                    if (!area_academica) {
                        return NextResponse.json({ message: 'Uno o varios de los parámetros están vacíos' }, { status: 500 });
                    } else {
                        const lastProfesor = await prisma.profesores.findFirst({
                            orderBy: { matricula: 'desc' },
                        });

                        const lastMatricula = lastProfesor ? parseInt(lastProfesor.matricula) : 1100000;
                        const nuevaMatricula = (lastMatricula + 1).toString();

                        const correo = `${nombre}.${apellido}@gradehub.edu.do`;

                        const profesor = await prisma.profesores.create({
                            data: {
                                nombre,
                                apellido,
                                area_academica,
                                telefono,
                                dirección,
                                contraseña,
                                correo,
                                tipo_documento,
                                documento,
                                matricula: nuevaMatricula,
                                activo: true
                            }
                        });

                        console.log("Profesor registrado con éxito");
                        return NextResponse.json({ message: 'Profesor registrado con éxito' }, { status: 200 });
                    }

                case 'administrador':
                    const lastAdministrador = await prisma.administradores.findFirst({
                        orderBy: { matricula: 'desc' },
                    });

                    const lastMatricula = lastAdministrador ? parseInt(lastAdministrador.matricula) : 1100000;
                    const nuevaMatricula = (lastMatricula + 1).toString();

                    const correo = `${nombre}.${apellido}@gradehub.edu.do`;

                    const administrador = await prisma.administradores.create({
                        data: {
                            nombre,
                            apellido,
                            telefono,
                            dirección,
                            contraseña,
                            correo,
                            tipo_documento,
                            documento,
                            matricula: nuevaMatricula,
                            activo: true
                        }
                    });

                    console.log("Administrador registrado con éxito");
                    return NextResponse.json({ message: 'Administrador registrado con éxito' }, { status: 200 });

                default:
                    return NextResponse.json({ message: 'Tipo de usuario no válido' }, { status: 500 });
            }
        }
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: 'Error al crear el usuario' }, { status: 500 });
    }
}
