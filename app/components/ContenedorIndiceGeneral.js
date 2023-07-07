import ProgressChart from './ProgressChart';
import React, { useEffect, useState } from 'react'
function ContenedorIndiceGeneral({ id_usuario }) {
  const [indice, setIndice] = useState(0);

  useEffect(() => {

    async function fetchData() {
      const newData = await getDatosSesion(id_usuario);
      setIndice(parseFloat(newData?.indice_general || 0));
    }

    fetchData();
  }, [id_usuario]);
  
  return (

    <div className="indicador">
      <ProgressChart value={indice} />
    </div>


  )
}

async function getDatosSesion(id_usuario) {
  const requestData = {
    id_usuario: id_usuario,
    rol: "Estudiante"
  };

  const response = await fetch('http://localhost:3000/api/DatosSesion', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(requestData),
  });

  const resultado = await response.json();
  return resultado;
}

export default ContenedorIndiceGeneral;
