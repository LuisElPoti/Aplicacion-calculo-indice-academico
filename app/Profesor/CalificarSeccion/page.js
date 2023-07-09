'use client'
import TablaBasica from "@/app/components/TablaBasica";
import DynamicSelect from "@/app/components/DynamicSelect";
import BotonGuardar from "@/app/components/BotonGuardar";
import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';

function CalificarSeccion() {
  const [calificacionesEstudiantes, setCalificacionesEstudiantes] = useState({});
  const [asignaturaSeleccionada, setAsignaturaSeleccionada] = useState('');
  const [menuItemsCodigosAsignatura, setMenuItemsCodigosAsignatura] = useState([]);
  const [SeccionAsignaturaSeleccionada, setSeccionAsignaturaSeleccionada] = useState('');
  const [data, setData] = useState([]);
  const [id_usuario, setID] = useState('');
  const [menuItemsSeccionAsignatura, setMenuItemsSeccionAsignatura] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const resultado = Cookies.get('ID');
      setID(resultado);
    }

    fetchData();

    if (id_usuario) {
      getAsignaturas(id_usuario)
        .then((asignaturasData) => {
          setMenuItemsCodigosAsignatura(asignaturasData);
          if (asignaturasData.length > 0) {
            const selectedAsignatura = asignaturasData[0].value;
            setAsignaturaSeleccionada(selectedAsignatura);
            getSecciones(selectedAsignatura, id_usuario)
              .then((seccionesData) => {
                const seccionesFormatted = seccionesData.map((seccion) => ({
                  value: seccion.id,
                  label: seccion.numero,
                }));
                setMenuItemsSeccionAsignatura(seccionesFormatted);
                setSeccionAsignaturaSeleccionada(seccionesFormatted[0].value);
              });
          }
        })
        .catch((error) => {
          // Manejar errores
          console.error("Error al obtener las áreas asignaturas:", error);
          console.error(error);
        });
    }
  }, [id_usuario]);

  useEffect(() => {
    setData(data.map((estudiante) => ({
      ...estudiante,
      Alpha: calcularLetra(calificacionesEstudiantes[estudiante.ID])
    })));
  }, [calificacionesEstudiantes]);

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
    setCalificacionesEstudiantes((prev) => ({ ...prev, [id]: event.target.value }));
  }
  const handleAsignaturaSelectChange = (event) => {
    setAsignaturaSeleccionada(event.target.value);
  };

  const handleSeccionAsignaturaSelectChange = (event) => {
    setSeccionAsignaturaSeleccionada(event.target.value);
  };

  async function handleClick() {
    const newData = await getEstudiantes(asignaturaSeleccionada, SeccionAsignaturaSeleccionada);
    // for(let i=0; i<newData.length; i++){
    //   setCalificacionesEstudiantes((prev) => ({ ...prev, [newData[i].ID]: 0 }));
    // }

    setData(newData.map((estudiante) => ({
      ...estudiante,
      Calificacion: <input type='number' onChange={(event) => handleCalificacionChange(event, estudiante.ID)} required className="textboxCalificacion-calificarEstudiantes" />,
      Alpha: calcularLetra(calificacionesEstudiantes[estudiante.ID])
    })));
  }


  // TABLE DATA
  const headers = ['Nombre', 'Id', 'Calificacion', 'Alpha'];

  // const data = [
  //   {
  //     Nombre: 'Allen Silverio',
  //     Id: '1104221',
  //     Calificacion: <input type='number' onChange={(event)=> handleCalificacionChange(event, "1104221")} required className="textboxCalificacion-calificarEstudiantes"/>,
  //     Alpha: calcularLetra(calificacionesEstudiantes["1104221"]),
  //   },
  //   {
  //     Nombre: 'Allen Silverio',
  //     Id: '1104220',
  //     Calificacion: <input type='number' onChange={(event)=> handleCalificacionChange(event, "1104220")} required className="textboxCalificacion-calificarEstudiantes"/>,
  //     Alpha: calcularLetra(calificacionesEstudiantes["1104220"]),
  //   }

  // ]

  // SELECT DATA

  // const menuItemsCodigosAsignatura = [
  //   { value: 'CBM207', label: 'CBM207' },
  //   { value: 'CBM301', label: 'CBM301' },
  //   { value: 'IDS402', label: 'IDS402' },

  // ]





  // const menuItemsSeccionAsignatura = [
  //   { value: '01', label: '01' },
  //   { value: '02', label: '02' },
  //   { value: '03', label: '03' },

  // ]





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

      <TablaBasica headers={headers} data={data} />


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
        label: asignatura.clave,
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
      Nombre: estudiante,
    };
  });
  console.log(data)
  return data;
}

export default CalificarSeccion;
