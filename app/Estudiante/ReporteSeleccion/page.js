import React from 'react'
import FiltroReporteSeleccion from '@/app/components/FiltroReportes'
import TablaBasica from '@/app/components/TablaBasica'
import BotonGuardar from '@/app/components/BotonGuardar'

 function ReporteSeleccion() {

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

  const headers = ['Asignatura', 'Seccion', 'Aula', 'Horario', 'Profesor'];

  const data = [
    { Asignatura: 'Estructuras de Datos - IDS305', Seccion: 1, Aula: 'GC-303', Horario: 'LU-MI 14/16', Profesor: 'Allen Silverio' },
    { Asignatura: 'Estructuras de Datos - IDS305', Seccion: 2, Aula: 'GC-303', Horario: 'LU-MI 16/18', Profesor: 'Allen Silverio' },
  ];

  return (

<>
<div className='flex'>
  <FiltroReporteSeleccion items={menuItemsYear} label="Año"/> 
  <FiltroReporteSeleccion items={menuItemsTrimestre} label="Trimestre"/> 
  </div>
    <TablaBasica headers={headers} data={data}/>
    <BotonGuardar/>
</>



  )
}

export default ReporteSeleccion
