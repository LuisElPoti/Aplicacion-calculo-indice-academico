'use client'
import React, { useEffect, useState } from 'react';
import FiltroReporteSeleccion from '@/app/components/FiltroReportes'
import TablaBasica from '@/app/components/TablaBasica'
import Tarjeta from '@/app/components/Tarjeta';
import BotonGuardar from '@/app/components/BotonGuardar';
import Cookies from 'js-cookie';

function ReporteCalificaciones() {
  const [data, setData] = useState([]);
  const [id_usuario, setID] = useState("0");
  const [año, setAño] = useState(2023);
  const [trimestre, setTrimestre] = useState(1);
  const [nombre, setNombre] = useState("Paola");
  const [carrera, setCarrera] = useState("Ingenieria de Software");
  const [headerValuesPurpleCard, setHeaderValuesPurpleCard] = useState([
    { headerName: 'Acumulados del Trimestre' },
    { headerName: 'Indice Trimestral', headerValue: 0 },
    { headerName: 'Puntos Acumulados', headerValue: 0 },
  ]);


  useEffect(() => {

    async function fetchData() {
      const resultado = await Cookies.get('ID');
      const newData = await getDatosSesion(resultado);
      setID(resultado);
      setNombre(newData?.nombre || "Paola");
      setCarrera(newData?.carreras?.nombre || "Ingenieria de Software");
    }

    fetchData();
  }, [id_usuario]);

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

  const headers = ['Asignatura', 'Seccion', 'Alpha', 'Calificacion', 'Puntos', 'Creditos'];

  async function handleClick() {
    const newData = await getCalificaciones(id_usuario, año, trimestre);
    if (newData.length == 0) {
      alert("No posee un reporte de calificaciones para el trimestre seleccionado");
      setHeaderValuesPurpleCard([
        { headerName: 'Acumulados del Trimestre' },
        { headerName: 'Indice Trimestral', headerValue: 0 },
        { headerName: 'Puntos Acumulados', headerValue: 0 },
      ]);
    }
    else {
      let sum_puntos = 0;
      let sum_creditos = 0;
      for (let i = 0; i < newData.length; i++) {
        const row = newData[i];
        sum_puntos += parseFloat(row.Puntos);
        sum_creditos += parseFloat(row.Creditos);
      }
      if (sum_creditos == 0) sum_creditos = 1;
      const indice = sum_puntos / sum_creditos;
      setData(newData);
      setHeaderValuesPurpleCard([
        { headerName: 'Acumulados del Trimestre' },
        { headerName: 'Indice Trimestral', headerValue: indice.toFixed(2) },
        { headerName: 'Puntos Acumulados', headerValue: sum_puntos },
      ]);
    }

  }

  const handleOnChangeTrim = async (event) => {
    setTrimestre(event.target.value)
  };


  const handleOnChangeAño = (event) => {
    setAño(event.target.value)
  };

  const headerValuesRedCard = [
    { headerName: 'ID', headerValue: id_usuario },
    { headerName: 'Nombre', headerValue: nombre },
    { headerName: 'Programa', headerValue: carrera },
  ];

  return (
    <>

      <div className='flex'>
        <FiltroReporteSeleccion items={menuItemsYear} label="Año" onChange={handleOnChangeAño} selectedItem={año} />
        <FiltroReporteSeleccion items={menuItemsTrimestre} label="Trimestre" onChange={handleOnChangeTrim} selectedItem={trimestre} />
        <BotonGuardar texto="Generar reporte" className="azul" onClick={handleClick} />
      </div>


      <div className='contenedor-tarjetas flex mb-8 mt-4 justify-between'>
        <Tarjeta headerValues={headerValuesRedCard} imageSource={"../images/cuate.svg"} className="bg-tarjeta-roja" />
        <Tarjeta headerValues={headerValuesPurpleCard} imageSource={"../images/pana.svg"} className="bg-tarjeta-morada" />
      </div>

      <h1 className='text-xl mb-6 font-bold'>Calificaciones del trimestre</h1>
      <TablaBasica headers={headers} data={data} />

    </>

  );
}

async function getDatosSesion(id_usuario) {
  const requestData = {
    id_usuario: id_usuario,
    rol: "Estudiante"
  };

  const response = await fetch('http://localhost:3000/api/DatosSesion', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(requestData),
  });

  const resultado = await response.json();
  return resultado;
}

async function getCalificaciones(id_usuario, año, trimestre) {
  const requestData = {
    id: id_usuario,
    a_o: año,
    trimestre: trimestre,
  };

  const response = await fetch('http://localhost:3000/api/ReporteCalificaciones', {
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

    const calificacion_numerica = historico.calificacion_numerica || 'Prueba';
    const alpha = historico.calificacion_literal || 'Prueba';

    const puntos = historico.puntos_honor || 'Prueba';
    const creditos = historico.secciones?.asignaturas?.creditos || 'Prueba';

    return {
      Asignatura: asignatura,
      Seccion: seccion,
      Alpha: alpha,
      Calificacion: calificacion_numerica,
      Puntos: puntos,
      Creditos: creditos,
    };
  });
  return data;
}
export default ReporteCalificaciones
