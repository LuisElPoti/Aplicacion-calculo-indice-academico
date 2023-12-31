import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useState } from 'react';

const TablaSeleccion = ({ headers, data, subData, handleDropdownClick }) => {
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
        <TableHead >
          <TableRow>
            {headers.map((header, index) => (
              <TableCell align="left" key={index}>
                {header}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row, rowIndex) => (
            <>
              <TableRow key={rowIndex} sx={{ backgroundColor: expandedRows.includes(rowIndex) ? '#E5ECFF' : 'white' }}>
                {Object.entries(row).map(([key, value], columnIndex) => (
                  <TableCell align="left" key={columnIndex}>
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
              {expandedRows.includes(rowIndex) &&
                subData
                  .filter((subItem) => subItem.parentIndex === rowIndex)
                  .map((subItem, subIndex) => (
                    <TableRow key={`subData-${rowIndex}-${subIndex}`}>
                      {subItem.values.map((value, columnIndex) => (
                        <TableCell align="center" key={columnIndex}>
                          {value}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))}
            </>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TablaSeleccion;





