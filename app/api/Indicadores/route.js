import { NextResponse } from "next/server";

import { prisma } from '../_base';

export async function POST(req) {
  const body = await req.json();

  const id_usuario = await body.id_usuario;

  const resultado = await prisma.estudiantes.findUnique({
    where: {
      matricula: id_usuario
    },
    select: {
      asignaturas_aprobadas: true,
      creditos_aprobados: true,
      trimestres_aprobados: true,
      indice_trimestral: true,
      carreras:{
        select:{
          total_creditos: true,
          total_asignaturas: true
        }
      }
    }
  });
  
  return NextResponse.json(resultado);
}