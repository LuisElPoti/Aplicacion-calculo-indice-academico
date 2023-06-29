import React from 'react'
import FiltroReporteSeleccion from "../../components/FiltroReporteSeleccion"


 function ReporteCalificaciones() {
  const data = [
    { header: 'ID', content: '1104081' },
    { header: 'Nombre', content: 'Paola Saldana' },
    { header: 'Programa', content: 'Ingeniería de software (IDS)' },
    // Add more fields as needed
  ];
  
  return (
    <>
    <FiltroReporteSeleccion /> 
    </>

  
  )
}

export default ReporteCalificaciones
