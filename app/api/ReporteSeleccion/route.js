import { NextResponse } from "next/server";

const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

export async function POST(req) {
  const body = await req.json();

  const id = body.id;

  const a_o = body.a_o;

  const trimestre = body.trimestre;
  const resultado = await prisma.historico_academico.findMany({
    select: {
      secciones: {
        select: {
          profesores: {
            select: {
              nombre: true,
              apellido: true
            }
          },
          numero: true,
          horario_secciones: {
            select: {
              aula: true,
              hora_fin: true,
              hora_inicio: true
            }
          },
          asignaturas: {
            select: {
              nombre: true
            }
          }
        }
      }
    },
    where: {
      AND: [
        {
          estudiantes: {
            is: { matricula: id }
          }
        },
        {
          secciones: {
            periodos: {
              is: { a_o: a_o }
            }
          }
        },
        {
          secciones: {
            periodos: {
              is: { id_trimestre: trimestre }
            }
          }
        }
      ]
    }

  });

  return NextResponse.json(resultado);
}