import React from 'react';

function BotonGuardar({ texto, className }) {
  return (
    <button type="submit" className={` m-0 ${className}`}>
      {texto}
    </button>
  );
}

export default BotonGuardar;