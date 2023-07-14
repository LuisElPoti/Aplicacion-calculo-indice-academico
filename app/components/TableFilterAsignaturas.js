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


const TableComponent = ({ headers, data, onClick }) => {
  const [searchText, setSearchText] = useState('');

  const filteredData = data.filter(item => {

    const searchTextMatch =
      item?.Clave?.toString().toLowerCase().includes(searchText.toString().toLowerCase()) ||
      item?.Asignatura?.toString().toLowerCase().includes(searchText.toString().toLowerCase()) ||
      item?.Area?.toString().toLowerCase().includes(searchText.toString().toLowerCase());
    return searchTextMatch;
  });

  const handleChange = (e) => {
    if (searchText.length <= 60) {
      setSearchText(e.target.value);
    }
    else {
      if (e.target.value.length > searchText.length) {
        alert('El texto a buscar no puede tener más de 50 caracteres');
        e.preventDefault();
      }
      else{
        setSearchText(e.target.value);
      }
    }

  }

  return (
    <div>
      <div className="filters flex items-center mt-5">
        <TextField
          label="Search"
          placeholder="Search by Clave, Asignatura, Area"
          value={searchText}
          onChange={(e) => handleChange(e)}
          sx={{ width: '50%', backgroundColor: '#fff', outline: 'none' }}
          className='mr-3'
        />
        <BotonGuardar texto={"Buscar asignatura"} className="amarillo" onClick={onClick} />

      </div>
      <TableContainer component={Paper} sx={{ width: '95%', fontFamily: 'Poppins', height: 'fit-content', borderRadius: '25px', marginTop: '3%', paddingLeft: '2%' }}>
        <Table sx={{ width: 1000, height: 100 }} aria-label="simple table">
          <TableHead>
            <TableRow style={{ marginBottom: '5px' }} >
              {headers.map((header, index) => (
                <TableCell align="left" key={index}>
                  {header}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredData.map((row, rowIndex) => (
              <TableRow key={rowIndex} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
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