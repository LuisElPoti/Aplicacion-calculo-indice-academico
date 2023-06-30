import React from 'react'
import FiltroReportes from '../../components/FiltroReportes';
import TablaBasica from '../../components/TablaBasica';
import Tarjeta from '../../components/Tarjeta';
import BotonGuardar from '../../components/BotonGuardar';

export default function ReporteCalificaciones() {
  const menuItemsYear = [
      { value: 2020, label: '2020' },
      { value: 2021, label: '2021' },
      { value: 2022, label: '2022' },
    ];

    const menuItemsTrimestre = [
      { value: 1, label: 'Feb-Abr' },
      { value: 2, label: "May-Jul" },
      { value: 3, label: "Ago-Oct" },
      { value: 4, label: "Nov-Ene" },
    ];

  const headers = ['Asignatura', 'Seccion', 'Alpha', 'Calificacion', 'Puntos', 'Créditos'];

  const data = [
    { Asignatura: 'Estructuras de Datos - IDS305', Seccion: 1, Alpha: 'A+', Horario: '96', Puntos: '8', Creditos:'4' },
    { Asignatura: 'Estructuras de Datos - IDS305', Seccion: 2, Alpa: 'B-', Horario: '83', Puntos: '7', Creditos:'4' },
  ];

  const headerValuesRedCard = [
    { headerName: 'ID', headerValue: 'RELLENAR BD' },
    { headerName: 'Nombre', headerValue: 'RELLENAR BD' },
    { headerName: 'Programa', headerValue: 'RELLENAR BD' },
  ];

  const headerValuesPurpleCard= [
    { headerName: 'Acumulados del Trimestre' },
    { headerName: 'Indice Trimestral', headerValue: 'RELLENAR BD' },
    { headerName: 'Puntos Acumulados', headerValue: 'RELLENAR BD' },
  ];

  
return (
  <>
  
 
  
  <form action="" method="" className='flex'>
  <FiltroReportes items={menuItemsYear} label="Año"/> 
  <FiltroReportes items={menuItemsTrimestre} label="Trimestre"/> 
  <BotonGuardar/>
  </form>
  

 

  <div className='contenedor-tarjetas flex mb-8 mt-4 justify-between'>
  <Tarjeta headerValues={headerValuesRedCard} imageSource={"../images/cuate.svg"} className="bg-tarjeta-roja"/>
  <Tarjeta headerValues={headerValuesPurpleCard} imageSource={"../images/pana.svg"} className="bg-tarjeta-morada"/>
  </div>
  
  <TablaBasica headers={headers} data={data} />

  
  
  </>
  
)
}

