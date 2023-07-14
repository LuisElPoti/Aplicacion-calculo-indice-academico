'use client'
import React, { useEffect, useState } from 'react';
import FiltroReporteSeleccion from '@/app/components/FiltroReportes'
import TablaBasica from '@/app/components/TablaBasica'
import BotonGuardar from '@/app/components/BotonGuardar'
import Cookies from 'js-cookie';
import axios from 'axios';

function ListadoEstudiante() {
  const [data, setData] = useState([]);
  const [id_usuario, setID] = useState('');
  const [asignatura, setAsignatura] = useState('');
  const [asignaturas, setAsignaturas] = useState([]);
  const [seccion, setSeccion] = useState('');
  const [secciones, setSecciones] = useState([]);
  const [nombre, setNombre] = useState("Paola");
  const [carrera, setCarrera] = useState("Ingenieria de Software");

  useEffect(() => {
    async function fetchData() {
      const resultado = Cookies.get('ID');
      setID(resultado);
      const newData = await getDatosSesion(resultado);
      setNombre(newData?.nombre || "Paola");
      setCarrera(newData?.carreras?.nombre || "Ingenieria de Software");
    }
  
    fetchData();
  
    if (id_usuario) {
      getAsignaturas(id_usuario)
        .then((asignaturasData) => {
          setAsignaturas(asignaturasData);
        })
        .catch((error) => {
          // Manejar errores
          console.error("Error al obtener las áreas asignaturas:", error);
          console.error(error);
        });
    }
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
    const seccionesData = await getSecciones(selectedAsignatura, id_usuario);
    const seccionesFormatted = seccionesData.map((seccion) => ({
      value: seccion.id,
      label: seccion.numero,
    }));
    setSecciones(seccionesFormatted);
  };
 

  return (

    <>
      <div className='flex'>
        <FiltroReporteSeleccion items={asignaturas} label="Asignatura" onChange={handleOnChangeAsignatura} selectedItem={asignatura} />
        <FiltroReporteSeleccion items={secciones} label="Seccion" onChange={handleOnChangeSeccion} selectedItem={seccion} />
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
  try {
    const requestData = {
      profesor: id_usuario,
    };

    const response = await axios.get('../api/ObtenerAsignatura', { params: requestData });

    if (Array.isArray(response.data)) {
      const asignaturas = response.data.map((asignatura) => ({
        value: asignatura.id,
        label: asignatura.nombre,
      }));
      return asignaturas;
    } else {
      console.error('La respuesta no es un array:', response.data);
      return [];
    }
  } catch (error) {
    console.error('Error al obtener las asignaturas:', error);
    throw error;
  }
}

async function getSecciones(asignaturaId, profesor) {
  const requestData = {
    asignatura: parseInt(asignaturaId),
    profesor: parseInt(profesor),
  };

  const response = await axios.get('../api/ObtenerSecciones', {
    params: requestData,});

  const secciones = response.data;
  return secciones;
}

async function getEstudiantes(asignatura, seccion) {
  try{
    const requestData = {
      asignatura: parseInt(asignatura),
      seccion: parseInt(seccion),
    };
  
    const response = await axios.get('../api/ListadoEstudiantes', {
      params: requestData,
    });
  
    const historico_academico = response.data;
  
    const data = historico_academico.map((historico) => {
      const matricula = historico.estudiantes?.matricula || 'Prueba';
      const estudiante = historico.estudiantes?.nombre || 'Prueba';
      const carrera = historico.estudiantes?.carreras?.nombre || 'Prueba'
  
      return {
        ID: matricula,
        Nombre: estudiante,
        Carrera: carrera,
      };
    });
    console.log(data)
    return data;
  }
  catch(error){
    alert("Este profesor no tiene secciones asignadas en este periodo")
    return [];
  }
  
}

export default ListadoEstudiante
