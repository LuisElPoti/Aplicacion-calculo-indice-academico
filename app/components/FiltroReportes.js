"use client"
import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function FiltroReportes({ items = [], label, onChange, selectedItem }) {
  return (
    <div>
      <FormControl sx={{ m: 1, minWidth: 120, backgroundColor: 'white', borderRadius: '8px', outline: 'none'}}>
        <InputLabel>{label}</InputLabel>
        <Select
          value={selectedItem}
          onChange={onChange}
          displayEmpty
          inputProps={{ 'aria-label': 'FiltroBusqueda', name: 'FiltroBusqueda' }}
          sx={{
            borderRadius: '8px',
            '& .MuiSelect-root': {
              padding: '8px',
            },
            '& .MuiSelect-icon': {
              top: 'calc(50% - 12px)',
            },
          }}
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