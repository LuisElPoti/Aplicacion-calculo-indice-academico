"use client"
import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

/*
function createData(Asignatura, Seccion, Aula, Horario, Profesor) {
  return { Asignatura, Seccion, Aula, Horario, Profesor };
}
const rows = [
  createData('Estructuras de Datos - IDS305', 1, 'GC-303', 'LU-MI 14/16', 'Allen Silverio'),
  createData('Estructuras de Datos - IDS305', 2, 'GC-303', 'LU-MI 16/18', 'Allen Silverio'),
];
*/

const TablaBasica = ({ headers, data }) => {
  return (
    <TableContainer component={Paper} sx={{ width: 730, fontFamily: 'Poppins', height: 400 }}>
      <Table sx={{ width: 700, height: 100 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            {headers.map((header, index) => (
              <TableCell align="center" key={index}>
                {header}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row, rowIndex) => (
            <TableRow key={rowIndex} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              {Object.values(row).map((value, columnIndex) => (
                <TableCell align="center" key={columnIndex}>
                  {value}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TablaBasica;