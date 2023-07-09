'use server'

import { prisma } from '../../_base';
import { NextResponse } from "next/server";

export async function POST(req){
    
    const { nombre, apellido, telefono, dirección, contraseña, tipo_documento, documento, carrera, area_academica, tipo_usuario, id_usuario } = await req.json();

    try {
        if (!nombre || !apellido || !telefono || !dirección || !contraseña || !tipo_documento || !documento || !tipo_usuario || !id_usuario) {
            return NextResponse.json({ message: 'Uno o varios de los parámetros están vacíos' }, { status: 500 });
        } else {
            let usuario = tipo_usuario;
            switch (usuario) {
                case 'estudiante':
                    if (!carrera) {
                        return NextResponse.json({ message: 'Uno o varios de los parámetros están vacíos' }, { status: 500 });
                    } else {
                        
                        const estudiante = await prisma.estudiantes.update({
                            data: {
                                nombre: nombre,
                                apellido: apellido,
                                id_carrera: carrera,
                                telefono: telefono,
                                direccion: dirección,
                                contrase_a: contraseña,
                                id_tipo_documento: tipo_documento,
                                documento:documento,
                            }, 
                            where: {
                                matricula: id_usuario
                            }
                        });

                        console.log("Estudiante modificado con éxito");
                        return NextResponse.json({ message: 'Estudiante modificado con éxito'}, { status: 200 });
                    }

                case 'profesor':
                    if (!area_academica) {
                        return NextResponse.json({ message: 'Uno o varios de los parámetros están vacíos' }, { status: 500 });
                    } else {
                        
                        const profesor = await prisma.profesores.update({
                            data: {
                                nombre,
                                apellido,
                                id_area_academica: area_academica,
                                telefono,
                                direccion: dirección,
                                contrase_a: contraseña,
                                id_tipo_documento: tipo_documento,
                                documento,
                            }, 
                            where: {
                                matricula: id_usuario
                            }
                        });

                        console.log("Profesor registrado con éxito");
                        return NextResponse.json({ message: 'Profesor modificado con éxito'}, { status: 200 });
                    }

                case 'administrador':
                    const administrador = await prisma.administradores.update({
                        data: {
                            nombre,
                            apellido,
                            direccion: dirección,
                            telefono,
                            documento,
                            contrase_a: contraseña,
                            id_tipo_documento: tipo_documento
                        }, 
                        where: {
                            matricula: id_usuario
                        }
                    });

                    console.log("Administrador modificado con éxito");
                    return NextResponse.json({ message: 'Administrador modificado con éxito'}, { status: 200 });

                default:
                    return NextResponse.json({ message: 'Tipo de usuario no válido' }, { status: 500 });
            }
        }
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: 'Error al crear el usuario' }, { status: 500 });
    }
}
