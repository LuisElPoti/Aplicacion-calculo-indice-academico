'use client'
import TablaBasica from "@/app/components/TablaBasica";
import DynamicSelect from "@/app/components/DynamicSelect";
import BotonGuardar from "@/app/components/BotonGuardar";
import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';

function CalificarSeccion() {

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

  const [calificacionEstudiante, setCalificacionEstudiante] = useState('');
  const handleCalificacionChange = (event) => {
    setCalificacionEstudiante(event.target.value);
  }

  // TABLE DATA
  const headers = ['Nombre', 'Id', 'Calificacion', 'Alpha'];
  const data = [
    {
      Nombre: 'Allen Silverio',
      Id: '1104220',
      Calificacion: <input type='number' onChange={handleCalificacionChange} required className="textboxCalificacion-calificarEstudiantes"/>,
      Alpha: calcularLetra(calificacionEstudiante),
    },
    {
      Nombre: 'Allen Silverio',
      Id: '1104220',
      Calificacion: <input type='number' onChange={handleCalificacionChange} required className="textboxCalificacion-calificarEstudiantes"/>,
      Alpha: calcularLetra(calificacionEstudiante),
    }

  ]

  // SELECT DATA

  const menuItemsCodigosAsignatura = [
    { value: 'CBM207', label: 'CBM207' },
    { value: 'CBM301', label: 'CBM301' },
    { value: 'IDS402', label: 'IDS402' },

  ]

  const [asignaturaSeleccionada, setAsignaturaSeleccionada] = useState('');
  const handleAsignaturaSelectChange = (event) => {
    setAsignaturaSeleccionada(event.target.value);
  };



  const menuItemsSeccionAsignatura = [
    { value: '01', label: '01' },
    { value: '02', label: '02' },
    { value: '03', label: '03' },

  ]

  const [SeccionAsignaturaSeleccionada, setSeccionAsignaturaSeleccionada] = useState('');
  const handleSeccionAsignaturaSelectChange = (event) => {
    setSeccionAsignaturaSeleccionada(event.target.value);
  };



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


        <BotonGuardar texto={'Cargar Listado'} className={"botonCargarListado-calificarEstudiantes"} onClick={""} />
        <BotonGuardar texto={'Confirmar Calificaciones'} className={"botonConfirmarCalificaciones-calificarEstudiantes ml-5"} onClick={""} />
      </div>

      <TablaBasica headers={headers} data={data} />


    </>

  )
}

export default CalificarSeccion;
