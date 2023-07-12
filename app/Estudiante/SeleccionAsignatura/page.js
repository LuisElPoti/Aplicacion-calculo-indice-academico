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
  const [dataSeleccion, setDataSeleccion] = useState([]);


  // CAMPOS PARA LA TABLA DE AGREGAR ASIGNATURAS

  const headers = ['Asignatura', 'Clave', 'Creditos', 'Agregar'];

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

        const filtered = data.filter(row =>
          Object.values(row).some(value =>
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


  const headersSeleccion = ['', 'Asignatura', 'Codigo', 'Cupos', 'Seccion', 'Horario', 'Aula', 'Profesor', ''];

  const handleAgregarAsignatura = (asignatura) => {
    const asignaturaExistente = dataSeleccion.find(
      (asignaturaSeleccionada) => asignaturaSeleccionada.Codigo === asignatura.clave
    );
  
    if (asignaturaExistente) {
      alert('La asignatura ya fue agregada');
    } else {
      const seccionesDisponibles = asignatura.secciones?.map(seccion => {
        const horarios = seccion.horario_secciones.map(horario => `${horario.dia} ${horario.hora_inicio}/${horario.hora_fin}`);
        const aulas = seccion.horario_secciones.map(horario => horario.aula);
        return {
          id: seccion.id,
          Asignatura: asignatura.nombre,
          Codigo: asignatura.clave,
          Cupos: seccion.cupo,
          Seccion: seccion.numero,
          Horario: horarios.join(', '), 
          Aula: aulas.join(', '),
          Profesor: seccion.profesores.nombre + ' ' + seccion.profesores.apellido
        };
      }) || [];
  
      const nuevaAsignatura = {
        id: asignatura.id,
        Asignatura: asignatura.nombre,
        Codigo: asignatura.clave,
        Cupos: '',
        Seccion: '',
        Horario: '',
        Aula: '',
        Profesor: '',
        seccionesDisponibles,
      };
      setDataSeleccion(prevData => [...prevData, nuevaAsignatura]);
    }
  };
  
  const handleEliminarAsignatura = (id) => {
    setDataSeleccion(prevData => prevData.filter(asignatura => asignatura.id !== id));
  };

  return (
    <>
      <div className='seleccion-container mt-5 mb-8'>
        <div className='seleccion-header flex mb-5'>
          <h1 className='mr-auto text-xl font-semibold' style={{ color: '#1F1F37' }}>Selección</h1>
          <BotonGuardar texto="Guardar" className={'botonGuardar-seleccionAsignaturas'} onClick={""} />
          <BotonGuardar texto="Cancelar" className={'botonCancelar-seleccionAsignaturas ml-5'} onClick={""} />
        </div>
        <div className='tablaSeleccion-container bg-white rounded-lg'>
          <TablaSeleccionOficial data={dataSeleccion} headers={headersSeleccion} onEliminarAsignatura={handleEliminarAsignatura}/>
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
          <BotonGuardar texto="CIENCIAS DE LA SALUD (SA)" className={'filtroBoton-seleccionarAsignaturas'} onClick={() => setSelectedArea('SA')} />
          <BotonGuardar texto="CIENCIAS SOCIALES Y HUMANIDADES (SH)" className={'filtroBoton-seleccionarAsignaturas'} onClick={() => setSelectedArea('SH')} />
          <BotonGuardar texto="ECONOMIA Y NEGOCIOS (NG)" className={'filtroBoton-seleccionarAsignaturas'} onClick={() => setSelectedArea('NG')} />
          <BotonGuardar texto="INGENIERIAS (IN)" className={'filtroBoton-seleccionarAsignaturas'} onClick={() => setSelectedArea('IN')} />
        </div>
        <div className='tablaAgregarAsignatura-seleccionAsignaturas'>
          <TablaAgregarAsignatura
            headers={headers}
            data={filteredData}
            onAgregarAsignatura={handleAgregarAsignatura}
          />
        </div>
      </div>
    </>
  );
}

