'use client'
import React, { useEffect, useState } from 'react';
import FiltroReporteSeleccion from '@/app/components/FiltroReportes'
import TablaBasica from '@/app/components/TablaBasica'
import BotonGuardar from '@/app/components/BotonGuardar'
import Cookies from 'js-cookie';
import axios from 'axios';

function ListadoEstudiante() {
  const [data, setData] = useState([]);
  const [id_usuario, setID] = useState(0);
  const [asignatura, setAsignatura] = useState(0);
  const [asignaturas, setAsignaturas] = useState([]);
  const [seccion, setSeccion] = useState(0);
  const [secciones, setSecciones] = useState([]);
  const [nombre, setNombre] = useState("Paola");
  const [carrera, setCarrera] = useState("Ingenieria de Software");

  useEffect(() => {

    async function fetchData() {
      const resultado =  Cookies.get('ID');
      const newData = await getDatosSesion(resultado);
      setID(resultado);
      setNombre(newData?.nombre || "Paola");
      setCarrera(newData?.carreras?.nombre || "Ingenieria de Software");
      const asignaturasData = await getAsignaturas(resultado);
      setAsignaturas(asignaturasData);
    }

    fetchData();
  }, [id_usuario]);


  const headers = ['ID', 'Nombre', 'Carrera'];


  async function handleClick() {
    const newData = await getEstudiantes(asignatura, seccion);
    setData(newData);
  }

  const handleOnChangeSeccion = (event) => {
    setSeccion(event.target.value)
  };


  const handleOnChangeAsignatura = async (event) => {
    const selectedAsignatura = event.target.value;
    setAsignatura(selectedAsignatura);
    const seccionesData = await getSecciones(selectedAsignatura);
    setSecciones(seccionesData);
  };


  return (

    <>
      <div className='flex'>
        <FiltroReporteSeleccion items={asignaturas} label="Asignaturas" onChange={handleOnChangeAsignatura} selectedItem={asignatura} />
        <FiltroReporteSeleccion items={secciones} label="Trimestre" onChange={handleOnChangeSeccion} selectedItem={seccion} />
        <BotonGuardar texto="Cargar listado" className="morado" onClick={handleClick} />

      </div>
      <TablaBasica headers={headers} data={data} />
    </>
  )
}

async function getDatosSesion(id_usuario) {
  const requestData = {
    id_usuario: id_usuario,
    rol: "Profesor"
  };

  const response = await axios.post('../api/DatosSesion', requestData);

  const resultado = response.data;
  return resultado;
}

async function getAsignaturas(id_usuario) {
  const requestData = {
    profesor: parseInt(id_usuario),
  };

  const response = await axios.post('../api/ObtenerAsignatura', requestData);

  const asignaturas = response.data;
  return asignaturas;
}

async function getSecciones(asignaturaId) {
  const requestData = {
    asignatura: parseInt(asignaturaId),
  };

  const response = await axios.post('../api/ObtenerSecciones', requestData);

  const secciones = response.data;
  return secciones;
}

async function getEstudiantes(asignatura, seccion) {
  const requestData = {
    asignatura: parseInt(asignatura),
    seccion: parseInt(seccion),
  };

  const response = await axios.get('../api/ListadoEstudiantes', {
    params: requestData,
  });

  const historico_academico = response.data;

  const data = historico_academico.map((historico) => {
    const id = historico.estudiantes?.id || 'Prueba';
    const estudiante = historico.estudiantes?.nombre || 'Prueba';
    const carrera = historico.estudiantes?.carreras?.nombre || 'Prueba'

    return {
      ID: id,
      Nombre: estudiante,
      Carrera: carrera,
    };
  });
  return data;
}

export default ListadoEstudiante
