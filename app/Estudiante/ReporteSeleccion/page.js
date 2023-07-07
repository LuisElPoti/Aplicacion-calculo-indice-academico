'use client'
import React, { useEffect, useState } from 'react';
import FiltroReporteSeleccion from '@/app/components/FiltroReportes'
import TablaBasica from '@/app/components/TablaBasica'
import BotonGuardar from '@/app/components/BotonGuardar'
import Cookies from 'js-cookie';
import TablaReporteSeleccion from '@/app/components/TablaReporteSeleccion';

function ReporteSeleccion() {
  const [data, setData] = useState([]);
  const [id_usuario, setID] = useState("0");
  const [año, setAño] = useState(2023);
  const [trimestre, setTrimestre] = useState(1);

  useEffect(() => {

    async function fetchData() {
      const resultado = await Cookies.get('ID');
      setID(resultado);
      console.log(resultado);
    }

    fetchData();
  }, [id_usuario]);

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


  async function handleClick() {
    const newData = await getSeleccion(id_usuario, año, trimestre);
    setData(newData);
  }

  const handleOnChangeTrim = async (event) => {
    setTrimestre(event.target.value)
  };


  const handleOnChangeAño = (event) => {
    setAño(event.target.value)
  };


  return (

    <>
      <div className='flex items-center mb-5'>
        <FiltroReporteSeleccion items={menuItemsYear} label="Año" onChange={handleOnChangeAño} selectedItem={año} />
        <FiltroReporteSeleccion items={menuItemsTrimestre} label="Trimestre" onChange={handleOnChangeTrim} selectedItem={trimestre} />
        <BotonGuardar texto="Generar reporte" className="azul" onClick={handleClick} />

      </div>
      {/* <TablaBasica headers={headers} data={data} /> */}
      <TablaReporteSeleccion headers={headers} data={data}/>
    </>
  )
}

async function getSeleccion(id_usuario, año, trimestre) {
  const requestData = {
    id: id_usuario,
    a_o: año,
    trimestre: trimestre,
  };

  const response = await fetch('http://localhost:3000/api/ReporteSeleccion', {
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
