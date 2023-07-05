'use server'

import { PrismaClient } from '@prisma/client';

import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(req) {

  const body = await req.json();

  const id_usuario = await body.id_usuario;

  const rol = await body.rol;

  if (!id_usuario || !rol) return NextResponse.json({ message: 'ID vacío' }, { status: 500 })
  else {
    let respuesta = {}
    switch (rol) {
      case 'Estudiante': {
        respuesta = await prisma.estudiantes.findUnique({
          where: {
            matricula: id_usuario
          },
          select: {
            matricula: true,
            nombre: true,
            apellido: true,
            indice_general: true,
            indice_trimestral: true,
            correo: true,
            carreras: {
              select:{
                nombre: true,
                descripcion: true
              }
            }
          }
        });
        break;
      }
      case 'Profesor': {
        respuesta = await prisma.profesores.findUnique({
          where: {
            matricula: id_usuario
          },
          select: {
            matricula: true,
            nombre: true,
            apellido: true,
            areas_academicas: {
              select: {
                nombre: true,
              }
            }
          }
        });
        break;
      }
      case 'Administrador': {
        respuesta = await prisma.administradores.findUnique({
          where: {
            matricula: id_usuario
          }
        });
        break;
      }
      default: {
        return NextResponse.json({ message: "Rol no valido" }, { status: 404 })
      }

    }
    return NextResponse.json( respuesta, { status: 200 })
  }

}
