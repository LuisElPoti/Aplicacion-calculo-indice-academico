'use client'
import TextField from '@mui/material/TextField';
import { useEffect, useState } from 'react';
import BotonGuardar from '@/app/components/BotonGuardar';
import TablaAgregarAsignatura from '@/app/components/TablaAgregarAsignatura';
import Image from 'next/image';
import TablaSeleccionOficial from '@/app/components/TablaSeleccionOficial';



export default function SeleccionAsignatura() {

    const [searchText, setSearchText] = useState('');

    // CAMPOS PARA LA TABLA DE AGREGAR ASIGNATURAS

    const headers = ['Asignatura', 'Clave', 'Creditos', 'Agregar']
    const data = [
        {
            Asignatura: 'Estructura de Datos',
            Clave: 'IDS305',
            Creditos: '4',
            Agregar: <button><Image src='/icons/plus-circle.svg' width={25} height={25} alt='Boton Agregar' onClick={""} /></button>, // BOTON PARA AGREGAR ASIGNATURA A LA SELECCION
        },
        {
            Asignatura: 'Team Building',
            Clave: 'IDS355',
            Creditos: '4',
            Agregar: <button><Image src='/icons/plus-circle.svg' width={25} height={25} alt='Boton Agregar' onClick={""} /></button>, // BOTON PARA AGREGAR ASIGNATURA A LA SELECCION
        },
        {
            Asignatura: 'Aseguramiento de Calidad',
            Clave: 'IDS342',
            Creditos: '4',
            Agregar: <button><Image src='/icons/plus-circle.svg' width={25} height={25} alt='Boton Agregar' onClick={""} /></button>, // BOTON PARA AGREGAR ASIGNATURA A LA SELECCION
        },
    ]

    // FILTER DATA AGREGAR ASIGNATURAS

    const [filteredData, setFilteredData] = useState(data);

    useEffect(() => {
        const filtered = data.filter((row) =>
            Object.values(row).some((value) =>
                value.toString().toLowerCase().includes(searchText.toLowerCase())
            )
        );
        setFilteredData(filtered);
    }, [searchText, data]);





    // TABLA SELECCION

    const headersSeleccion = ["", 'Asignatura', 'Codigo', 'Cupos', 'Seccion', 'Horario', 'Aula', 'Profesor', ""];
    const dataSeleccion = [
        {
            id: '01',
            Asignatura: 'Estructuras de Datos',
            Codigo: 'IDS305',
            Cupos: '',
            Seccion: '',
            Horario: '',
            Aula: '',
            Profesor: '',
            seccionesDisponibles: [{ id: 'IDS300-1', Asignatura: 'Estructuras de Datos', Codigo: 'IDS305', Cupos: '40', Seccion: '01', Horario: 'LU-MI 14/16', Aula: 'GC402', Profesor: 'Allen Silverio' },
            { id: 'IDS300-2', Asignatura: 'Estructuras de Datos', Codigo: 'IDS305', Cupos: '40', Seccion: '01', Horario: 'LU-MI 14/16', Aula: 'GC402', Profesor: 'Allen Silverio' }]
        },
    ];


    return (
        <>

            <div className='seleccion-container mt-5 mb-8'>

                <div className='seleccion-header flex mb-5'>
                    <h1 className='mr-auto text-xl font-semibold' style={{ color: '#1F1F37' }}>Selección</h1>
                    <BotonGuardar texto="Guardar" className={'botonGuardar-seleccionAsignaturas'} onClick={""} />
                    <BotonGuardar texto="Cancelar" className={'botonCancelar-seleccionAsignaturas ml-5'} onClick={""} />
                </div>

                <div className='tablaSeleccion-container bg-white rounded-lg'>
                    <TablaSeleccionOficial data={dataSeleccion} headers={headersSeleccion} />
                </div>


            </div>



            <div className='filters-seleccionarAsignaturas flex mt-5'>
                <TextField
                    label=""
                    placeholder="Busca por Nombre Asignatura, Clave"
                    value={searchText}
                    onChange={e => setSearchText(e.target.value)}
                    sx={{ width: '80%', backgroundColor: '#fff', marginRight: '50px', borderRadius: '40px' }}
                    className='mr-auto'
                />

                <BotonGuardar texto="Buscar" className={'azul buscar-seleccionAsignaturas'} onClick={""} />
            </div>

            <div className='agregarAsignaturas-container mt-5 mb-8 flex'>

                <div className='filtrosBotones-seleccionarAsignaturas mr-7 flex flex-col'>
                    <BotonGuardar texto="CIENCIAS BASICAS Y AMBIENTALES (CB)" className={'filtroBoton-seleccionarAsignaturas'} onClick={""} />
                    <BotonGuardar texto="CIENCIAS DE LA SALUD (SA)" className={'filtroBoton-seleccionarAsignaturas'} onClick={""} />
                    <BotonGuardar texto="CIENCIAS SOCIALES Y HUMANIDADES (SH)" className={'filtroBoton-seleccionarAsignaturas'} onClick={""} />
                    <BotonGuardar texto="ECONOMIA Y NEGOCIOS (ING)" className={'filtroBoton-seleccionarAsignaturas'} onClick={""} />
                    <BotonGuardar texto="INGENIERIAS (IN)" className={'filtroBoton-seleccionarAsignaturas'} onClick={""} />
                </div>

                <div className='tablaAgregarAsignatura-seleccionAsignaturas'>
                    <TablaAgregarAsignatura
                        headers={headers}
                        data={filteredData}
                    />
                </div>

            </div>

        </>

    )
}
