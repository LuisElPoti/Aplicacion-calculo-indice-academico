'use client'
import React, {useState} from 'react';
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

const [año, setAño] = useState('');
const [trimestre, setTrimestre] = useState('');

const [data, setData] = useState([]);

const handleClick = async () => {
  const newData = await getSeleccion(id_usuario, año, trimestre);
  setData(newData)
};

const handleOnChangeTrim = (event) => {
  setTrimestre(event.target.value)
  console.log(event.target.value)
};


const handleOnChangeAño = (event) => {
  setAño(event.target.value)
  console.log(event.target.value)
};


return (

<>
<div className='flex'>
<FiltroReporteSeleccion items={menuItemsYear} label="Año" onChange={handleOnChangeAño}/> 
<FiltroReporteSeleccion items={menuItemsTrimestre} label="Trimestre" onChange={handleOnChangeTrim} /> 
</div>
  <TablaBasica headers={headers} data={data}/>
  <BotonGuardar/>
</>

)
}

async function getSeleccion(id_usuario, año, trimestre){
  const requestData = {
    id: id_usuario,
    a_o: año,
    trimestre: trimestre,
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
  return data;
  
}

export default ReporteSeleccion
