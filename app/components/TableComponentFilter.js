"use client"
import React, { useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import BotonGuardar from '@/app/components/BotonGuardar';


const TableComponent = ({ headers, data }) => {
  const [searchText, setSearchText] = useState('');
  const [filterType, setFilterType] = useState('');

  const filteredData = data.filter(item => {
    const searchTextMatch =
      item?.Id?.toString().toLowerCase().includes(searchText.toString().toLowerCase()) ||
      item?.Nombre?.toString().toLowerCase().includes(searchText.toString().toLowerCase()) ||
      item?.Documento?.toString().toLowerCase().includes(searchText.toString().toLowerCase());
    const filterTypeMatch = filterType === '' || item.Tipo === filterType;
    return searchTextMatch && filterTypeMatch;
  });

  return (
    <div>
      <div className="filters flex items-center mt-5">
        <TextField
          label="Search"
          placeholder="Search by Nombre, Id, Documento"
          value={searchText}
          onChange={e => setSearchText(e.target.value)}
          sx={{width: '50%', backgroundColor: '#fff',  outline:'none'}}
          className='mr-3'
        />
        <TextField
          select
          label="Tipo de Usuario"
          value={filterType}
          onChange={e => setFilterType(e.target.value)}
          sx={{width: '20%', borderRadius: '20px', backgroundColor: '#fff'}}
          
        >
          <MenuItem value="">Todos</MenuItem>
          <MenuItem value="Estudiante">Estudiante</MenuItem>
          <MenuItem value="Administrador">Administrador</MenuItem>
          <MenuItem value="Profesor">Profesor</MenuItem>
        </TextField>
        <BotonGuardar texto={"Cargar listado"} className="amarillo" />

      </div>
      <TableContainer component={Paper} sx={{ width: '95%', fontFamily: 'Poppins', height: 'fit-content', borderRadius: '25px', marginTop: '3%', paddingLeft:'2%'}}>
        <Table sx={{ width: 1000, height: 100}}  aria-label="simple table">
          <TableHead>
            <TableRow style={{marginBottom:'5px'}} >
              {headers.map((header, index) => (
                <TableCell align="left"  key={index}>
                  {header}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredData.map((row, rowIndex) => (
              <TableRow key={rowIndex} style={{display:'', justifyContent:''}} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                {Object.values(row).map((value, columnIndex) => (
                  <TableCell align="left" key={columnIndex}>
                    {value}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

     
    </div>
  );
};

export default TableComponent;
