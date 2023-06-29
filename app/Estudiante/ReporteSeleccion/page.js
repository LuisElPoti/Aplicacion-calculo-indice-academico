import React from 'react'
import FiltroReporteSeleccion from '@/app/components/FiltroReporteSeleccion'
import TablaBasica from '@/app/components/TablaBasica'
import BotonGuardar from '@/app/components/BotonGuardar'

 function ReporteSeleccion() {

  const headers = ['Asignatura', 'Seccion', 'Aula', 'Horario', 'Profesor'];

  const data = [
    { Asignatura: 'Estructuras de Datos - IDS305', Seccion: 1, Aula: 'GC-303', Horario: 'LU-MI 14/16', Profesor: 'Allen Silverio' },
    { Asignatura: 'Estructuras de Datos - IDS305', Seccion: 2, Aula: 'GC-303', Horario: 'LU-MI 16/18', Profesor: 'Allen Silverio' },
  ];

  return (

<>
    <FiltroReporteSeleccion/>
    <TablaBasica headers={headers} data={data}/>
    <BotonGuardar/>
</>



  )
}

export default ReporteSeleccion
