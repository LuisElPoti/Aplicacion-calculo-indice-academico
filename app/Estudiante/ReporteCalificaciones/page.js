import React from 'react'
import FiltroReportes from '../../components/FiltroReportes';
import TablaBasica from '../../components/TablaBasica';
import Tarjeta from '../../components/Tarjeta';

export default function ReporteCalificaciones() {
  const menuItemsYear = [
      { value: 2020, label: '2020' },
      { value: 2021, label: '2021' },
      { value: 2022, label: '2022' },
    ];

    const menuItemsTrimestre = [
      { value: 1, label: 'Feb-Abr' },
      { value: 2, label: "May-Jul" },
      { value: 3, label: "Ago-Oct" },
      { value: 4, label: "Nov-Ene" },
    ];

  const headers = ['Asignatura', 'Seccion', 'Alpha', 'Calificacion', 'Puntos', 'Créditos'];

  const data = [
    { Asignatura: 'Estructuras de Datos - IDS305', Seccion: 1, Alpha: 'A+', Horario: '96', Puntos: '8', Creditos:'4' },
    { Asignatura: 'Estructuras de Datos - IDS305', Seccion: 2, Alpa: 'B-', Horario: '83', Puntos: '7', Creditos:'4' },
  ];

  const headerValues = [
    { headerName: 'ID', headerValue: '1104220' },
    { headerName: 'Nombre', headerValue: 'Allen Silverio' },
    { headerName: 'Programa', headerValue: 'Ingeniería de Software' },
  

  ];

  
return (
  <>
  
  <div className='flex'>
  

  <FiltroReportes items={menuItemsYear} label="Año"/> 
  <FiltroReportes items={menuItemsTrimestre} label="Trimestre"/> 
  </div>

  <Tarjeta headerValues={headerValues} backgroundColor="#ED6F71"/>
  <TablaBasica headers={headers} data={data} />

  
  
  </>
  
)
}

