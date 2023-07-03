import React from 'react';

function BotonGuardar({ texto, className, onClick}) {
  return (
    <button type="submit" onClick={onClick} className={` m-0 ${className}`}>
      {texto}
    </button>
  );
}

export default BotonGuardar;