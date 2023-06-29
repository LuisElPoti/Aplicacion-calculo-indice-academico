import React from 'react'
import ContenedorIndicadores from '../../components/ContenedorIndicadores'
import ContenedorIndiceGeneral from '../../components/ContenedorIndiceGeneral'
import ContenedorInformacion from '../../components/ContenedorInformacion'
import TablaBasica from '../../components/TablaBasica'

export default function MenuPrincipalEstudiante() {


    const headers = ['Asignatura', 'Seccion', 'Aula', 'Horario', 'Profesor'];

    const data = [
      { Asignatura: 'Estructuras de Datos - IDS305', Seccion: 1, Aula: 'GC-303', Horario: 'LU-MI 14/16', Profesor: 'Allen Silverio' },
      { Asignatura: 'Estructuras de Datos - IDS305', Seccion: 2, Aula: 'GC-303', Horario: 'LU-MI 16/18', Profesor: 'Allen Silverio' },
    ];

    return (
       
        <div className= 'grid grid-cols-3 gap-3'>
            
            <ContenedorIndicadores />
            <ContenedorIndiceGeneral />
            <div className='row-span-2 ml-2'><ContenedorInformacion /></div>
            <TablaBasica headers={headers} data={data}/>
            
        </div>

    )
}
