'use server'

import { prisma } from '../../_base';

import { NextResponse } from "next/server";

import { cookies } from 'next/headers'

export async function POST(req) {
  const body = await req.json();

  const id_usuario = await body.id_usuario;
  const password_usuario = await body.password_usuario;

  if (!id_usuario || !password_usuario) {
    return NextResponse.json({ message: 'ID vacío' }, { status: 500 });
  } else {
    // Validar longitud y caracteres del ID
    if (id_usuario.length > 7 || !/^[0-9]+$/.test(id_usuario)) {
      return NextResponse.json({ message: 'ID inválido. Debe tener máximo 7 caracteres y solo puede contener números.' }, { status: 400 });
    }

    const estudiante = await prisma.estudiantes.findFirst({
      where: {
        AND: [
          { matricula: id_usuario },
          { contrase_a: password_usuario }
        ]
      }
    });

    if (estudiante == null) {
      const profesor = await prisma.profesores.findFirst({
        where: {
          AND: [
            { matricula: id_usuario },
            { contrase_a: password_usuario }
          ]
        }
      });

      if (profesor == null) {
        const administrador = await prisma.administradores.findFirst({
          where: {
            AND: [
              { matricula: id_usuario },
              { contrase_a: password_usuario }
            ]
          }
        });

        if (administrador == null) {
          return NextResponse.json({ message: 'Usuario o contraseña no encontrados' }, { status: 404 });
        } else {
          console.log("Bienvenido Administrador");
          cookies().set('ID', administrador.matricula);
          return NextResponse.json({ rol: 'Administrador'}, { status: 200 });
        }

      } else {
        console.log("Bienvenido Profesor");
        cookies().set('ID', profesor.matricula);
        return NextResponse.json({ rol: 'Profesor'}, { status: 200 });
      }
    } else {
      console.log("Bienvenido Estudiante");
      cookies().set('ID', estudiante.matricula);
      //redirect('../Estudiante/MenuPrincipal')
      return NextResponse.json({ rol: 'Estudiante'}, { status: 200 });
    }
  }
}
