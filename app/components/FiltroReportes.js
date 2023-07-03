"use client"
import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';



export default function FiltroReportes({ items = [], label, onChange, selectedItem}) {
  return (
    <div>
      <FormControl sx={{ m: 1, minWidth: 120 }}>
        <InputLabel>{label}</InputLabel>
        <Select
          value={selectedItem}
          onChange={onChange}
          displayEmpty
          inputProps={{ 'aria-label': 'FiltroBusqueda', 'name':'FiltroBusqueda' }}
        >
          
          {items && items.length > 0 && items.map((item) => (
            <MenuItem key={item.value} value={item.value}>
              {item.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}