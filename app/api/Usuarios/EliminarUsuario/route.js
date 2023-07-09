'use server'

import { prisma } from '../../_base';
import { NextResponse } from "next/server";

export async function POST(req){
    
    const { id_usuario, tipo_usuario } = await req.json();

    try {
        if (!id_usuario || !tipo_usuario) {
            return NextResponse.json({ message: 'Uno o varios de los parámetros están vacíos' }, { status: 500 });
        } else {
            let usuario = tipo_usuario;
            switch (usuario) {
                case 'estudiante':
                    const estudiante = await prisma.estudiantes.update({
                        where: {
                            matricula: id_usuario
                        },
                        data: {
                            activo: false
                        }
                    });
                return NextResponse.json({ message: 'Usuario inhabilitado' }, { status: 200 });
                case 'profesor':
                    const profesor = await prisma.profesores.update({
                        where: {
                            matricula: id_usuario
                        },
                        data: {
                            activo: false
                        }
                    });

                return NextResponse.json({ message: 'Usuario inhabilitado' }, { status: 200 });
                case 'administrador':
                    const administrador = await prisma.administradores.update({
                        where: {
                            matricula: id_usuario
                        },
                        data: {
                            activo: false
                        }
                    });
                return NextResponse.json({ message: 'Usuario inhabilitado' }, { status: 200 });

                default:
                    return NextResponse.json({ message: 'Tipo de usuario no válido' }, { status: 500 });
            }
        }
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: 'Error al inhabilitar el usuario' }, { status: 500 });
    }
}
