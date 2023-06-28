import React from 'react'
import ContenedorIndicadores from '../components/ContenedorIndicadores'
import ContenedorIndiceGeneral from '../components/ContenedorIndiceGeneral'
import ContenedorInformacion from '../components/ContenedorInformacion'
import TablaBasica from '../components/TablaBasica'

export default function MenuPrincipalEstudiante() {
    return (
        <>
        <div className= 'grid grid-cols-3'>
            
            <ContenedorIndicadores />
            <ContenedorIndiceGeneral />
            <div className='row-span-2 ml-2'><ContenedorInformacion /></div>
            <div className='col-span-2'><TablaBasica /></div>
            
            
            
            

     

        </div>

        
        </>


    )
}
