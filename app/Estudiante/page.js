import React from 'react'
import ContenedorIndicadores from '../components/ContenedorIndicadores'
import ContenedorIndiceGeneral from '../components/ContenedorIndiceGeneral'
import ContenedorInformacion from '../components/ContenedorInformacion'

export default function MenuPrincipalEstudiante() {
    return (
        <div className='flex gap-8 pt-5'>
            <ContenedorIndicadores />
            <ContenedorIndiceGeneral />
            <ContenedorInformacion />


        </div>


    )
}
