import { NextResponse } from "next/server";

const {PrismaClient} =  require('@prisma/client')
const prisma = new PrismaClient()

export async function POST(req) {
    const {id, a_o, trimestre} = req.body;
    const resultado = await prisma.historico_academico.findMany({
      select: {
        calificacion_literal: true,
        calificacion_numerica: true,
        puntos_honor: true,
        secciones: {
          select: {
            numero: true,
            asignaturas: {
              select: {
                nombre: true,
                creditos: true
              }
            }
          }
        }
      },
      where: {
        AND:[
          {
            estudiantes:{
              is:{ matricula: id }
            }
          },
          {
            secciones:{
              periodos:{
                is:{a_o: a_o}
              }
            }
          },
          {
            secciones:{
              periodos:{
                is:{id_trimestre: trimestre}
              }
            }
          }
        ]
      }
        
    });
  
    return NextResponse.json(resultado);
  }