'use server'

import { PrismaClient } from '@prisma/client';

import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(req) {

  const body = await req.json();

  const id_usuario = await body.id_usuario;

  if(!id_usuario) return NextResponse.json({message: 'ID vacío'}, {status: 500})
  else{
    
    const estudiante = await prisma.estudiantes.findUnique({
      where: {
        matricula: id_usuario
      }
    });

    if(estudiante == null){
      const profesor = await prisma.profesores.findUnique({
        where: {
          matricula: id_usuario
        }
      });
      if(profesor == null){
        const administrador = await prisma.administradores.findUnique({
          where: {
            matricula: id_usuario
          }
        });
        if(administrador == null){
          return NextResponse.json({ message: 'No se encuentra un usuario con ese ID' }, { status: 500 });
        }
        else{
          return NextResponse.json({ administrador }, { status: 200 });
        }
      }
      else{
        return NextResponse.json({ profesor }, { status: 200 });
      }
    }
    else{
      return NextResponse.json({ estudiante }, { status: 200 });
    }
  }
  
}
