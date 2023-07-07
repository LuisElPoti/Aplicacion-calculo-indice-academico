import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useState } from 'react';

const TablaSeleccion = ({ headers, data, subData, isOpen, handleDropdownClick }) => {
  const [expandedRows, setExpandedRows] = useState([]);

  const handleExpandRow = (rowIndex) => {
    if (expandedRows.includes(rowIndex)) {
      setExpandedRows(expandedRows.filter((row) => row !== rowIndex));
    } else {
      setExpandedRows([...expandedRows, rowIndex]);
    }
  };

  return (
    <TableContainer component={Paper} sx={{ width: 1050, fontFamily: 'Poppins', height: 500, borderRadius: '40px', boxShadow: 'none' }}>
      <Table sx={{ width: 1050, height: 100 }} aria-label="simple table">
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
            <>
              <TableRow key={rowIndex} sx={{ backgroundColor: expandedRows[rowIndex] ? '#F3F6FF' : 'white' }}>
                {Object.entries(row).map(([key, value], columnIndex) => (
                  <TableCell align="center" key={columnIndex}>
                    {key === 'DropdownAsignatura' ? (
                      <button onClick={() => handleExpandRow(rowIndex)}>
                        {value}
                      </button>
                    ) : (
                      value
                    )}
                  </TableCell>
                ))}
              </TableRow>
              {expandedRows.includes(rowIndex) && (
                <TableRow key={`subData-${rowIndex}`}>
                  {Object.values(subData[rowIndex]).map((value, columnIndex) => (
                    <TableCell align="center" key={columnIndex}>
                      {value}
                    </TableCell>
                  ))}
                </TableRow>
              )}
            </>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TablaSeleccion;
