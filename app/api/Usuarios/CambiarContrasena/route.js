'use server'

import { PrismaClient } from '@prisma/client';

import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(req) {

  const body = await req.json();

  const nueva_password = body.nueva_password;

  const confirmar_password = body.confirmar_password;

  const id_usuario = body.id_usuario;


  if(!nueva_password || !id_usuario || !confirmar_password) return NextResponse.json({message: 'Uno o varios de los parametros estan vacios'}, {status: 500})
  else{
    let tipoUsuario = null;

    const estudiante = await prisma.estudiantes.findFirst({ where: { matricula: id_usuario } });
    const profesor = await prisma.profesores.findFirst({ where: { matricula: id_usuario } });
    const administrador = await prisma.administradores.findFirst({ where: { matricula: id_usuario } });

    if (estudiante) {
        tipoUsuario = 'Estudiante';
    } else if (profesor) {
        tipoUsuario = 'Profesor';
    } else if (administrador) {
        tipoUsuario = 'Administrador';
    } else {
        console.log("Usuario o contraseña no encontrados");
    }

    if (tipoUsuario) {
        if (nueva_password !== confirmar_password) {
            console.log("Error, La contraseña no coincide");
        } else {
            switch (tipoUsuario) {
                case 'Estudiante':
                    await prisma.estudiantes.update({
                        where: { matricula: id_usuario },
                        data: { contrase_a: nueva_password },
                    });
                    break;
                case 'Profesor':
                    await prisma.profesores.update({
                        where: { matricula: id_usuario },
                        data: { contrase_a: nueva_password },
                    });
                    break;
                case 'Administrador':
                    await prisma.administradores.update({
                        where: { matricula: id_usuario },
                        data: { contrase_a: nueva_password },
                    });
                    break;
            }
            
            console.log("Contraseña modificada con éxito");
            return NextResponse.json({ message: 'Contraseña modificada con éxito' }, { status: 200 });
        }
    }
  }
  
}
