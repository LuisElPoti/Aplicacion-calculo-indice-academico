"use client"
import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

function createData(Asignatura, Seccion, Aula, Horario, Profesor) {
  return { Asignatura, Seccion, Aula, Horario, Profesor };
}

const rows = [
  createData('Estructuras de Datos - IDS305', 1, 'GC-303', 'LU-MI 14/16', 'Allen Silverio'),
  createData('Estructuras de Datos - IDS305', 2, 'GC-303', 'LU-MI 16/18', 'Allen Silverio'),
];

function TablaBasica() {
  return (
    <TableContainer component={Paper} sx={{ width: 730 , fontfamily: 'Poppins', height:400 }}>
      <Table sx={{ width: 700, height: 100}} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Asignatura</TableCell>
            <TableCell align="right">Seccion</TableCell>
            <TableCell align="right">Aula</TableCell>
            <TableCell align="right">Horario</TableCell>
            <TableCell align="right">Profesor</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell align="right">{row.Asignatura}</TableCell>
              <TableCell align="right">{row.Seccion}</TableCell>
              <TableCell align="right">{row.Aula}</TableCell>
              <TableCell align="right">{row.Horario}</TableCell>
              <TableCell align="right">{row.Profesor}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default TablaBasica;