import React from 'react'
import FiltroReportes from "../../components/FiltroReportes";
import TablaBasica from '../../components/TablaBasica';
import BotonGuardar from '../../components/BotonGuardar';

export default function ReporteSeleccion() {
  const headers = ['Asignatura', 'Seccion', 'Aula', 'Horario', 'Profesor'];

  const data = [
    { Asignatura: 'Estructuras de Datos - IDS305', Seccion: 1, Aula: 'GC-303', Horario: 'LU-MI 14/16', Profesor: 'Allen Silverio' },
    { Asignatura: 'Estructuras de Datos - IDS305', Seccion: 2, Aula: 'GC-303', Horario: 'LU-MI 16/18', Profesor: 'Allen Silverio' },
  ];

  return (

<>
    <FiltroReportes/>
    <TablaBasica headers={headers} data={data}/>
    <BotonGuardar/>
</>



  )
}


