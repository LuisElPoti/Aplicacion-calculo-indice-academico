'use client'
import TablaBasica from "@/app/components/TablaBasica";
import DynamicSelect from "@/app/components/DynamicSelect";
import BotonGuardar from "@/app/components/BotonGuardar";
import React, { useEffect, useState } from 'react';
import { alpha } from "@mui/material";
import Cookies from 'js-cookie';
import axios from 'axios';


function CalificarSeccion() {
  const [datosEstudiantes, setData] = useState([]);
  const [id_usuario, setID] = useState('0');
  const [asignaturaSeleccionada, setAsignaturaSeleccionada] = useState('');
  const [menuItemsCodigosAsignatura, setAsignaturas] = useState([]);
  const [SeccionAsignaturaSeleccionada, setSeccionAsignaturaSeleccionada] = useState('');
  const [menuItemsSeccionAsignatura, setSecciones] = useState([]);
  useEffect(() => {
    async function fetchData() {
      const resultado = Cookies.get('ID');
      setID(resultado);
      if (resultado) {
        getAsignaturas(resultado)
          .then(async (asignaturasData) => {
            setAsignaturas(asignaturasData);
            setAsignaturaSeleccionada(asignaturasData[0]?.value);
            const seccionesData = await getSecciones(asignaturasData[0]?.value, resultado);
            const seccionesFormatted = seccionesData.map((seccion) => ({
              value: seccion.id,
              label: seccion.numero,
            }));
            setSecciones(seccionesFormatted);
            setSeccionAsignaturaSeleccionada(seccionesFormatted[0]?.value);
          })
          .catch((error) => {
            // Manejar errores
            console.error("Error al obtener las áreas asignaturas:", error);
            console.error(error);
          });

      }
    }

    fetchData();


  }, [id_usuario]);

  //ASIGNAR LETRA A LA CALIFICACION
  function calcularLetra(calificacion) {
    if (calificacion >= 90) {
      return 'A';
    } else if (calificacion >= 85) {
      return 'B+';
    } else if (calificacion >= 80) {
      return 'B';
    } else if (calificacion >= 75) {
      return 'C+';
    } else if (calificacion >= 70) {
      return 'C-';
    } else if (calificacion >= 65) {
      return 'D+';
    } else if (calificacion >= 60) {
      return 'D-';
    }
    else {
      return 'F';
    }
  }

  const handleCalificacionChange = (event, id) => {
    if (datosEstudiantes.length > 0) {
      
      const index = datosEstudiantes.findIndex((estudiante) => estudiante.ID === id);
      const newData = datosEstudiantes;
      newData[index].Alpha = calcularLetra(event.target.value);
      setData(newData);
    }
  }

  // TABLE DATA
  const headers = ['Id', 'Nombre', 'Calificacion', 'Alpha'];


  // SELECT DATA

  const handleAsignaturaSelectChange = async (event) => {
    const selectedAsignatura = event.target.value;
    setAsignaturaSeleccionada(selectedAsignatura);
    const seccionesData = await getSecciones(selectedAsignatura);
    const seccionesFormatted = seccionesData.map((seccion) => ({
      value: seccion.id,
      label: seccion.numero,
    }));
    setSecciones(seccionesFormatted);
  };

  const handleSeccionAsignaturaSelectChange = (event) => {
    setSeccionAsignaturaSeleccionada(event.target.value);
  };

  async function handleClick() {
    const newData = await getEstudiantes(asignaturaSeleccionada, SeccionAsignaturaSeleccionada);
    const resultado = newData.map((estudiante) => {
      return {
        ...estudiante,
        Calificacion: <input type='number' onChange={(e) => handleCalificacionChange(e, estudiante.ID)} required className="textboxCalificacion-calificarEstudiantes" />,
        Alpha: calcularLetra(0)
      }
    });

    setData(resultado);
  }

  return (
    <>

      <div className="filterBar-calificarEstudiantes mb-8 mt-12">

        <div className="selectFilters-calificarEstudiantes flex mr-auto">

          <DynamicSelect
            options={menuItemsCodigosAsignatura}
            value={asignaturaSeleccionada}
            onChange={handleAsignaturaSelectChange}
            selectClassName={'select-asignatura-calificarEstudiantes mr-4'}
            placeholder={'Asignatura'}
          />

          <DynamicSelect
            options={menuItemsSeccionAsignatura}
            value={SeccionAsignaturaSeleccionada}
            onChange={handleSeccionAsignaturaSelectChange}
            selectClassName={'select-seccion-calificarEstudiantes'}
            placeholder={'Sección'}
          />

        </div>


        <BotonGuardar texto={'Cargar Listado'} className={"botonCargarListado-calificarEstudiantes"} onClick={handleClick} />
        <BotonGuardar texto={'Confirmar Calificaciones'} className={"botonConfirmarCalificaciones-calificarEstudiantes ml-5"} onClick={""} />
      </div>

      <TablaBasica headers={headers} data={datosEstudiantes} />


    </>

  )
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
    params: requestData,
  });

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
    const matricula = historico.estudiantes?.matricula || 'Prueba';
    const estudiante = historico.estudiantes?.nombre || 'Prueba';

    return {
      ID: matricula,
      Nombre: estudiante
    };
  });
  return data;
}

export default CalificarSeccion;
