"use client"
import React, { useState } from 'react';

import TablaBasica from '../../components/TablaBasica'
import { TextField } from '@mui/material';
import BotonGuardar from '@/app/components/BotonGuardar';


const headers = ['Clave', 'Asignatura', 'Creditos', 'Area'];

const data = [
  { Clave: 'IDS305', Asignatura: 'Estructuras de Datos', Creditos: '01', Area: 'Ingenierias'},
  { Clave: 'IDS305', Asignatura: 'Estructuras de Datos', Creditos: '01', Area: 'Ingenierias'},];

function ListadoAsignaturas() {

  const [searchText, setSearchText] = useState('');

  return (
    <>
        <div className='filters flex items-center m-5 l-0'>
        <TextField
          label="Search"
          placeholder="Search by Asignatura, Seccion, Aula"
          value={searchText}
          onChange={e => setSearchText(e.target.value)}
          sx={{width: '50%', backgroundColor: '#fff',  outline:'none', borderRadius: '20px'}}
        />
        <BotonGuardar texto='Cargar Asignaturas' className={'amarillo ml-10'} onClick={" "}/>
    </div >
    <div classname = "flex items-center t-30">
      <TablaBasica headers={headers} data={data} />
    </div>
    </>

  );
}

export default ListadoAsignaturas;
