'use server'

import { prisma } from '../../_base';
import { NextResponse } from "next/server";


export async function POST(req){
    
    const { nombre, apellido, telefono, dirección, contraseña, tipo_documento, documento, carrera, area_academica, tipo_usuario } = await req.json();

    try {
        if (!nombre || !apellido || !telefono || !dirección || !contraseña || !tipo_documento || !documento || !tipo_usuario) {
            return NextResponse.json({ message: 'Uno o varios de los parámetros están vacíos' }, { status: 500 });
        } else {
            const existEstudiante = await prisma.estudiantes.findFirst({
                where: {
                    documento: documento
                }
            });

            const existProfesor = await prisma.profesores.findFirst({
                where: {
                    documento: documento
                }
            });

            const existAdministrador = await prisma.administradores.findFirst({
                where: {
                    documento: documento
                }
            });

            if (existEstudiante || existProfesor || existAdministrador) {
                return NextResponse.json({ message: 'Ya existe un usuario con ese documento' }, { status: 500 });
            }
            else {
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
                                    id_carrera: carrera,
                                    telefono,
                                    direccion: dirección,
                                    contrase_a: contraseña,
                                    correo: correo,
                                    id_tipo_documento: tipo_documento,
                                    documento,
                                    matricula: nuevaMatricula,
                                    activo: true
                                }
                            });

                            console.log("Estudiante registrado con éxito");
                            return NextResponse.json({ message: 'Estudiante registrado con éxito su matrícula y correo son: ', matricula: estudiante.matricula, correo: estudiante.correo}, { status: 200 });
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
                                    id_area_academica: area_academica,
                                    telefono,
                                    direccion: dirección,
                                    contrase_a: contraseña,
                                    correo: correo,
                                    id_tipo_documento: tipo_documento,
                                    documento,
                                    matricula: nuevaMatricula,
                                    activo: true
                                }
                            });

                            console.log("Profesor registrado con éxito");
                            return NextResponse.json({ message: 'Profesor registrado con éxito, su matrícula y correo son: ', matricula: profesor.matricula, correo: profesor.correo}, { status: 200 });
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
                                direccion: dirección,
                                telefono,
                                correo,
                                documento,
                                contrase_a: contraseña,
                                activo: true,
                                matricula: nuevaMatricula,
                                id_tipo_documento: tipo_documento
                            }
                        });

                        console.log("Administrador registrado con éxito");
                        return NextResponse.json({ message: 'Administrador registrado con éxito, su matrícula y correo son: ', matricula: administrador.matricula, correo: administrador.correo}, { status: 200 });

                    default:
                        return NextResponse.json({ message: 'Tipo de usuario no válido' }, { status: 500 });
                }
            }

                
        }
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: 'Error al crear el usuario' }, { status: 500 });
    }
}
