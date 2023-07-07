import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

export default function CreditosCharts({ value, maxValue }) {
  const [CreditosAprobados, setCreditosAprobados] = React.useState(0);

  React.useEffect(() => {
    const CreditosCalculados = (value / maxValue) * 100;
    setCreditosAprobados(CreditosCalculados);
  }, [value, maxValue]);


  return (
    <Box sx={{ position: 'relative', display: 'inline-flex', width: 150, height: 150}}>
      <CircularProgress variant="determinate" value={CreditosAprobados} size={150} color="success"/>
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
        <Typography variant="caption" component="div" className='tipografia-grafico-creditos'>
        {value}
        </Typography>
      </Box>
    </Box>
  );
}