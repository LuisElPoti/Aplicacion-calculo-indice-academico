import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Tooltip from '@mui/material/Tooltip';
import Box from '@mui/material/Box';

export default function ProgressChart({ value }) {
  const [indiceAcademico, setIndiceAcademico] = React.useState(1.0);

  React.useEffect(() => {
    setIndiceAcademico(value);
  }, [value]);

  const isIndiceZero = indiceAcademico === 0;

  return (
    <Tooltip
      title={isIndiceZero ? 'El índice aún no ha sido calculado' : ''}
      placement="top"
    >
      <Box sx={{ position: 'relative', display: 'inline-flex', width: 250, height: 250 }}>
        <CircularProgress
          variant="determinate"
          value={((indiceAcademico - 1.0) / 3.0) * 100}
          size={250}
          color="secondary"
        />
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
          <span
            className={`tipografia-grafico ${isIndiceZero ? 'show-label' : ''}`}
          >
            {indiceAcademico.toFixed(2)}
          </span>
        </Box>
      </Box>
    </Tooltip>
  );
}
