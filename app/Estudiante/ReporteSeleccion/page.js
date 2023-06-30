'use client'
import React from 'react';
import Cookies from 'js-cookie';
import FiltroReporteSeleccion from '@/app/components/FiltroReportes'
import TablaBasica from '@/app/components/TablaBasica'
import BotonGuardar from '@/app/components/BotonGuardar'


async function ReporteSeleccion() {
const menuItemsYear = [
  { value: 2020, label: '2020' },
  { value: 2021, label: '2021' },
  { value: 2022, label: '2022' },
  { value: 2023, label: '2023' },
];

const menuItemsTrimestre = [
  { value: 1, label: 'Feb-Abr' },
  { value: 2, label: "May-Jul" },
  { value: 3, label: "Ago-Oct" },
  { value: 4, label: "Nov-Ene" },
];

const headers = ['Asignatura', 'Seccion', 'Aula', 'Horario', 'Profesor'];

const id_usuario = Cookies.get('id_usuario');

const requestData = {
  id: id_usuario,
  a_o: 2023,
  trimestre: 1,
};

const response = await fetch('http://localhost:3000/api/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(requestData),
  });

  const historico_academico = await response.json();

  const data = historico_academico.map((historico) => {
  const asignatura = historico.secciones?.asignaturas?.nombre || 'Prueba';
  const seccion = historico.secciones?.numero || 'Prueba';
  var aula = ''
  var horario = ''; 

  for (let i = 0; i < historico.secciones.horario_secciones.length; i++) {
    aula += historico.secciones.horario_secciones[i].aula + '  ';
    horario += historico.secciones.horario_secciones[i].hora_inicio + '/' + historico.secciones.horario_secciones[i].hora_fin + '  ';
  }
  
  const profesor = historico.secciones?.profesores?.nombre + " " + historico.secciones?.profesores?.apellido || 'Prueba';

  return {
    Asignatura: asignatura,
    Seccion: seccion,
    Aula: aula,
    Horario: horario,
    Profesor: profesor,
  };
});

return (

<>
<div className='flex'>
<FiltroReporteSeleccion items={menuItemsYear} label="Año"/> 
<FiltroReporteSeleccion items={menuItemsTrimestre} label="Trimestre" /> 
</div>
  <TablaBasica headers={headers} data={data}/>
  <BotonGuardar/>
</>

)
}

export default ReporteSeleccion
