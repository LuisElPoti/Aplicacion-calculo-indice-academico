'use server'

import { PrismaClient } from '@prisma/client';
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(req) {
    try {
      const carreras = await prisma.carreras.findMany({
        select: {
          id: true,
          nombre: true
        }
        
      });
      
      const areasAcademicas = await prisma.areas_academicas.findMany({
        select: {
          id: true,
          nombre: true
        }
      });
      
      return {
        body: {
          carreras,
          areasAcademicas
        }
      };
      
    } catch (error) {
      console.error(error);
      return NextResponse.json(
        { message: 'Error al obtener las carreras y áreas académicas' },
        { status: 500 }
      );
    }
  }
  

export async function POST(req){
    
    const { nombre, apellido, telefono, dirección, contraseña, tipo_documento, documento, carrera, area_academica, tipo_usuario } = await req.json();

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
