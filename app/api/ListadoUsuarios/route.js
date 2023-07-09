'use server'

import { prisma } from '../_base';
import { NextResponse } from "next/server";

export async function GET(req) {
    try {
        let resultado = await prisma.estudiantes.findMany({
            select: {
                matricula: true,
                documento: true,
                nombre: true,
                apellido: true,
                carreras: {
                    select: {
                        nombre: true,
                        areas_academicas: {
                            select: {
                                nombre: true
                            }
                        }
                    }
                }

            },
            where: {
                activo: true
            }
        });

        let usuarios = resultado.map((usuario) => {
            const Id = usuario.matricula;
            const Nombre = usuario.nombre + " " + usuario.apellido;
            return {
                Tipo: "Estudiante",
                Id: Id,
                Nombre: Nombre,
                Documento: usuario.documento,
                Carrera: usuario.carreras.nombre,
                Area: usuario.carreras.areas_academicas.nombre
            }
        });

        resultado = await prisma.profesores.findMany({
            select: {
                matricula: true,
                documento: true,
                nombre: true,
                apellido: true,
                areas_academicas: {
                    select: {
                        nombre: true
                    }
                }
            },
            where: {
                activo: true
            }
        });

        usuarios = usuarios.concat(resultado.map((usuario) => {
            const Id = usuario.matricula;
            const Nombre = usuario.nombre + " " + usuario.apellido;
            return {
                Tipo: "Profesor",
                Id: Id,
                Nombre: Nombre,
                Documento: usuario.documento,
                Carrera: "-",
                Area: usuario.areas_academicas.nombre
            }
        }));

        resultado = await prisma.administradores.findMany({
            select: {
                matricula: true,
                documento: true,
                nombre: true,
                apellido: true
            },
            where: {
                activo: true
            }
        });

        usuarios = usuarios.concat(resultado.map((usuario) => {
            const Id = usuario.matricula;
            const Nombre = usuario.nombre + " " + usuario.apellido;
            return {
                Tipo: "Administrador",
                Id: Id,
                Nombre: Nombre,
                Documento: usuario.documento,
                Carrera: "-",
                Area: "-"
            }
        }));


        return NextResponse.json(usuarios, { status: 200 }); // 200 OK

    } catch (error) {
        console.error('Error al obtener los estudiantes:', error); // 500 Internal Server Error
        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }
}