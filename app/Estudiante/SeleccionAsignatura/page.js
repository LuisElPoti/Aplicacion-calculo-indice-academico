'use client'
import TextField from '@mui/material/TextField';
import { useEffect, useState } from 'react';
import BotonGuardar from '@/app/components/BotonGuardar';
import TablaAgregarAsignatura from '@/app/components/TablaAgregarAsignatura';
import Image from 'next/image';
import TablaSeleccionOficial from '@/app/components/TablaSeleccionOficial';
import axios from 'axios';


export default function SeleccionAsignatura() {

    const [searchText, setSearchText] = useState('');
    const [filteredData, setFilteredData] = useState([]);
    const [selectedArea, setSelectedArea] = useState('');


    // CAMPOS PARA LA TABLA DE AGREGAR ASIGNATURAS
    
    const headers = ['Asignatura', 'Clave', 'Creditos', 'Agregar']

    useEffect(() => {
        const fetchData = async () => {
          try {
            const requestData = {
                area: selectedArea,
            };
            const response = await axios.get('../api/AsignaturaByArea', { params: requestData });
            const data = response.data.map(asignatura => ({
                Asignatura: asignatura.nombre,
                Clave: asignatura.clave,
                Creditos: asignatura.creditos,
                Agregar: <button><Image src='/icons/plus-circle.svg' width={25} height={25} alt='Boton Agregar' onClick={() => handleAgregarAsignatura(asignatura)} /></button>,
            }));

            const filtered = data.filter((row) =>
            Object.values(row).some((value) =>
                value.toString().toLowerCase().includes(searchText.toLowerCase())
            )
            );
            setFilteredData(filtered);
            
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        };
    
        fetchData();

        
        

    }, [selectedArea, searchText]);

    

    // FILTER DATA AGREGAR ASIGNATURAS

    
    // useEffect(() => {
    //     const filtered = data.filter((row) =>
    //         Object.values(row).some((value) =>
    //             value.toString().toLowerCase().includes(searchText.toLowerCase())
    //         )
    //     );
    //     setFilteredData(filtered);
    // }, [searchText, data]);





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
            { id: 'IDS300-2', Asignatura: 'Estructuras de Datos', Codigo: 'IDS305', Cupos: '40', Seccion: '02', Horario: 'LU-MI 14/16', Aula: 'GC402', Profesor: 'Allen Silverio' }]
        },
        {
            id: '02',
            Asignatura: 'Algoritmos Computacionales',
            Codigo: 'INF322',
            Cupos: '',
            Seccion: '',
            Horario: '',
            Aula: '',
            Profesor: '',
            seccionesDisponibles: [{ id: 'INF322-1', Asignatura: 'Algoritmos Computacionales', Codigo: 'INF322', Cupos: '40', Seccion: '01', Horario: 'LU-MI 14/16', Aula: 'GC402', Profesor: 'Allen Silverio' },
            { id: 'INF322-2', Asignatura: 'Algoritmos Computacionales', Codigo: 'INF322', Cupos: '40', Seccion: '02', Horario: 'LU-MI 14/16', Aula: 'GC402', Profesor: 'Allen Silverio' }]
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
                    <BotonGuardar texto="CIENCIAS BASICAS Y AMBIENTALES (CB)" className={'filtroBoton-seleccionarAsignaturas'} onClick={() => setSelectedArea('CB')} />
                    <BotonGuardar texto="CIENCIAS DE LA SALUD (SA)" className={'filtroBoton-seleccionarAsignaturas'} onClick={() => setSelectedArea('SA')}/>
                    <BotonGuardar texto="CIENCIAS SOCIALES Y HUMANIDADES (SH)" className={'filtroBoton-seleccionarAsignaturas'} onClick={() => setSelectedArea('SH')}/>
                    <BotonGuardar texto="ECONOMIA Y NEGOCIOS (NG)" className={'filtroBoton-seleccionarAsignaturas'} onClick={() => setSelectedArea('NG')}/>
                    <BotonGuardar texto="INGENIERIAS (IN)" className={'filtroBoton-seleccionarAsignaturas'} onClick={() => setSelectedArea('IN')}/>
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
