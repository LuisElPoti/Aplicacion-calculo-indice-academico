import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

export default function ProgressChart({ value, maxValue}) {
  const progress = (value / maxValue) * 100;

  return (
    <Box sx={{ position: 'relative', display: 'inline-flex', width: 75, height: 75}}>
      <CircularProgress variant="determinate" value={progress} size={75}  color='primary' />
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: 'absolute',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Typography variant="caption" component="div" className='tipografia-mini-charts'>
          {value}
        </Typography>
      </Box>
    </Box>
  );
}