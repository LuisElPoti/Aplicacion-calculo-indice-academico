'use client'
import TextField from '@mui/material/TextField';
import { use, useState } from 'react';
import BotonGuardar from '@/app/components/BotonGuardar';
import TablaAgregarAsignatura from '@/app/components/TablaAgregarAsignatura';
import Image from 'next/image';
import TablaSeleccion from '@/app/components/TablaSeleccion';



export default function SeleccionAsignatura() {
    const [searchText, setSearchText] = useState('');

    // CAMPOS PARA LA TABLA DE AGREGAR ASIGNATURAS

    const headers = ['Asignatura', 'Clave', 'Creditos', 'Agregar']
    const data = [
        {
            Asignatura: 'Estructura de Datos',
            Clave: 'IDS305',
            Credito: '4',
            Agregar: <button><Image src='/icons/plus-circle.svg' width={25} height={25} alt='Boton Agregar' onClick={""} /></button>, // BOTON PARA AGREGAR ASIGNATURA A LA SELECCION
        },
    ]

    //DESPLEGAR SECCIONES DISPONIBLES
    // const [showAsignaturaSeccionDisponible, setShowAsignaturaSeccionDisponible] = useState(false);

    // const handleAsignaturaSeccionDisponible = () => {
    //     setShowAsignaturaSeccionDisponible(!showAsignaturaSeccionDisponible);

    // }

    


    const [seccionSeleccionada, setSeccionSeleccionada] = useState([]);

    const handleSeccionSeleccionadaChange = (e) => {

        const { value, checked } = e.target;
        if (checked) {
            // Agregar la seccion seleccionada a la lista de secciones seleccionadas
            setSeccionSeleccionada([...seccionSeleccionada, value]);
        } else {
            // Remover el día deseleccionado de la lista de días seleccionados
            setSeccionSeleccionada(seccionSeleccionada.filter((seccion) => seccion !== value));
        }
        console.log(seccionSeleccionada);
    }

    







    // TABLA SELECCION


    const headersSeleccion = ["", 'Asignatura', 'Codigo', 'Cupos', 'Seccion', 'Horario', 'Aula', 'Profesor', ""];
    const dataSeleccion = [
        {
            DropdownAsignatura: <button><Image src='/icons/ArrowDown.svg' width={10} height={10} alt='Arrown Down' onClick={""} /></button>,
            Asignatura: 'Estructuras de Datos',
            Codigo: 'IDS305',
            Cupos: '',
            Seccion: '',
            Horario: '',
            Aula: '',
            Profesor: '',
            DeleteAsignatura: <button><Image src='/icons/IconX.svg' width={10} height={10} alt='Arrown Down' onClick={""} /></button>,
        },
        {
            DropdownAsignatura: <button><Image src='/icons/ArrowDown.svg' width={10} height={10} alt='Arrown Down' onClick={""} /></button>,
            Asignatura: 'Estructuras de Datos',
            Codigo: 'IDS305',
            Cupos: '',
            Seccion: '',
            Horario: '',
            Aula: '',
            Profesor: '',
            DeleteAsignatura: <button><Image src='/icons/IconX.svg' width={10} height={10} alt='Arrown Down' onClick={""} /></button>,
        },
    ];



    const subDataSeleccion = [
        {
            RadioButton: <input type='radio' name="radio-group" value={'IDS305 - 02'} onChange={handleSeccionSeleccionadaChange} />,
            Asignatura: 'Estructuras de Datos',
            Codigo: 'IDS305',
            Cupos: '40',
            Seccion: '02',
            Horario: 'LU-MI 14/16',
            Aula: 'GC402',
            Profesor: 'Allen Silverio',
        },

        {
            RadioButton: <input type='radio' name="radio-group" value={'IDS305 - 02'} onChange={handleSeccionSeleccionadaChange} />,
            Asignatura: 'Estructuras de Datos',
            Codigo: 'IDS305',
            Cupos: '40',
            Seccion: '02',
            Horario: 'LU-MI 14/16',
            Aula: 'GC402',
            Profesor: 'Allen Silverio',
        },

        {
            RadioButton: <input type='radio' name="radio-group" value={'IDS305 - 02'} onChange={handleSeccionSeleccionadaChange} />,
            Asignatura: 'Estructuras de Datos',
            Codigo: 'IDS305',
            Cupos: '40',
            Seccion: '02',
            Horario: 'LU-MI 14/16',
            Aula: 'GC402',
            Profesor: 'Allen Silverio',
        },

    ];

    const [dropdownStates, setDropdownStates] = useState(Array(dataSeleccion.length).fill(false));
    const handleAsignaturaSeccionDisponible = (index) => {
        setDropdownStates((prevStates) => {
            const newStates = [...prevStates];
            newStates[index] = !newStates[index];
            return newStates;
        });
    };



    return (
        <>

            <div className='seleccion-container mt-5 mb-8'>

                <div className='seleccion-header flex mb-5'>
                    <h1 className='mr-auto text-xl font-semibold' style={{ color: '#1F1F37' }}>Selección</h1>
                    <BotonGuardar texto="Guardar" className={'botonGuardar-seleccionAsignaturas'} onClick={""} />
                    <BotonGuardar texto="Cancelar" className={'botonCancelar-seleccionAsignaturas ml-5'} onClick={""} />
                </div>

                <div className='tablaSeleccion'>
                    <TablaSeleccion data={dataSeleccion} subData={subDataSeleccion} headers={headersSeleccion} isOpen={dropdownStates} handleDropdownClick={handleAsignaturaSeccionDisponible} />

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
                        data={data}
                    />
                </div>

            </div>





        </>

    )
}