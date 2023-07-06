'use client'
import TablaBasica from "@/app/components/TablaBasica";
import DynamicSelect from "@/app/components/DynamicSelect";
import BotonGuardar from "@/app/components/BotonGuardar";
import { useState } from "react";



function CalificarSeccion() {

  // TABLE DATA
  const headers = ['Nombre', 'Id', 'Calificacion'];
  const data = [
    {
      Nombre: 'Allen Silverio',
      Id: '1104220',
      Calificacion: '98'
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

      <div className="filterBar-calificarEstudiantes">

        <DynamicSelect
          options={menuItemsCodigosAsignatura}
          value={asignaturaSeleccionada}
          onChange={handleAsignaturaSelectChange}
          selectClassName={'select-asignatura-calificarEstudiantes'}
          placeholder={'Asignatura'}
        />

        <DynamicSelect
          options={menuItemsSeccionAsignatura}
          value={SeccionAsignaturaSeleccionada}
          onChange={handleSeccionAsignaturaSelectChange}
          selectClassName={'select-seccion-calificarEstudiantes'}
          placeholder={'Sección'}
        />

        <BotonGuardar texto={'Cargar Listado'} className={"botonCargarListado-calificarEstudiantes"} onClick={""} />
        <BotonGuardar texto={'Confirmar Calificaciones'} className={"botonConfirmarCalificaciones-calificarEstudiantes"} onClick={""} />
      </div>

      <TablaBasica headers={headers} data={data} />


    </>

  )
}

export default CalificarSeccion;
