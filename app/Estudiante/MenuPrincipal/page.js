'use client'
import React, { useEffect, useState } from 'react'
import ContenedorIndicadores from '../../components/ContenedorIndicadores'
import ContenedorIndiceGeneral from '../../components/ContenedorIndiceGeneral'
import ContenedorInformacion from '../../components/ContenedorInformacion'
import TablaBasica from '../../components/TablaBasica'
import Cookies from "js-cookie";


export default function MenuPrincipalEstudiante() {
    const headers = ['Asignatura', 'Seccion', 'Aula', 'Horario', 'Profesor'];
    const [data, setData] = useState([]);
    const [id_usuario, setID] = useState("0");
    
    useEffect(() => {
      
      async function fetchData() {
        const resultado = await Cookies.get('ID');
        setID(resultado);
        const newData = await getSeleccion(resultado, 2023, 1);
        setData(newData);
      }

      fetchData();
    }, [id_usuario]);
    
    return (
       
        <div className= 'grid grid-cols-3 gap-3'>
            
            <ContenedorIndicadores id_usuario={id_usuario} />
            <ContenedorIndiceGeneral  />
            <div className='row-span-2 ml-2'><ContenedorInformacion id_usuario={id_usuario}/></div>
            <TablaBasica headers={headers} data={data}/>
            
        </div>

    )
}

async function getSeleccion(id_usuario, año, trimestre){
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