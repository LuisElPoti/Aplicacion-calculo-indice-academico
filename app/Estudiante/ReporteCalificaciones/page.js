'use client'
import React, { useEffect, useState } from 'react';
import FiltroReportes from '@/app/components/FiltroReportes';
import TablaBasica from '@/app/components/TablaBasica'
import Tarjeta from '@/app/components/Tarjeta';
import BotonGuardar from '@/app/components/BotonGuardar';
import Cookies from 'js-cookie';




async function ReporteCalificaciones() {
  const menuItemsYear = [
    { value: 2020, label: '2020' },
    { value: 2021, label: '2021' },
    { value: 2022, label: '2022' },
    { value: 2023, label: '2023' }
  ];

  const menuItemsTrimestre = [
    { value: 1, label: 'Feb-Abr' },
    { value: 2, label: "May-Jul" },
    { value: 3, label: "Ago-Oct" },
    { value: 4, label: "Nov-Ene" },
  ];

  const headers = ['Asignatura', 'Seccion', 'Alpha', 'Calificacion', 'Puntos', 'Créditos'];
  
  const id_usuario = Cookies.get('id_usuario');

  const headerValuesRedCard = [
    { headerName: 'ID', headerValue: 'RELLENAR BD' },
    { headerName: 'Nombre', headerValue: 'RELLENAR BD' },
    { headerName: 'Programa', headerValue: 'RELLENAR BD' },
  ];

  const headerValuesPurpleCard= [
    { headerName: 'Acumulados del Trimestre' },
    { headerName: 'Indice Trimestral', headerValue: 'RELLENAR BD' },
    { headerName: 'Puntos Acumulados', headerValue: 'RELLENAR BD' },
  ];

  const [año, setAño] = useState('');
  const [trimestre, setTrimestre] = useState('');
  const [calificaciones, setCalificaciones] = useState([]);
  

  useEffect(() => {
    obtenerCalificaciones();
  }, [año, trimestre]);

  const obtenerCalificaciones = async () => {
    const {PrismaClient} =  require('@prisma/client')
    const prisma = new PrismaClient()
    
    try {
      const resultados = await prisma.historico_academico.findMany({
        select: {
          asignaturas: {
            select: {
              nombre: true
            }
          },
          secciones: {
            select: {
              numero: true
            }
          },
          calificacion_literal: true,
          calificacion_numerica: true,
          puntos_honor: true,
          asignaturas: {
            select: {
              creditos: true
            }
          }
        },
        where: {
          secciones: {
            periodos: {
              año: { in: [año] },
              id_trimestre: { in: [trimestre] }
            }
          },
          id_estudiante: id_usuario
        },
      });
  
      setCalificaciones(resultados);
    } catch (error) {
      console.error('Error al obtener las calificaciones:', error);
    }
  };
  

return (
  <>
  
  <div className='flex'>
  <FiltroReportes items={menuItemsYear} label="Año" value={anio} onChange={(selectedValue) => setAño(selectedValue)}/> 
  <FiltroReportes items={menuItemsTrimestre} label="Trimestre" value={trimestre} onChange={(selectedValue) => setTrimestre(selectedValue)}/> 
  <BotonGuardar />  
  </div>
  
  
  <div className='contenedor-tarjetas flex mb-8 mt-4 justify-between'>
  <Tarjeta headerValues={headerValuesRedCard} imageSource={"../images/cuate.svg"} className="bg-tarjeta-roja"/>
  <Tarjeta headerValues={headerValuesPurpleCard} imageSource={"../images/pana.svg"} className="bg-tarjeta-morada"/>
  </div>
  
  <TablaBasica headers={headers} data={calificaciones} />
  <h1 className='text-xl mb-6 font-bold'>Calificaciones del trimestre</h1>
  <TablaBasica headers={headers} data={data} />

  
  
  </>
  
);
}
export default ReporteCalificaciones
