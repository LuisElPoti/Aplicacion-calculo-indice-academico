'use client'

import React, { useEffect, useState } from 'react'
import Cookies from "js-cookie";


function ContenedorIndicadores({ id_usuario }) {

  const [indicadores, setIndicadores] = useState({});

  useEffect(() => {

    async function fetchData() {
      const newData = await getIndicadores(id_usuario);
      setIndicadores(newData);
    }

    fetchData();
  }, [indicadores]);


  return (
    <div className="indicadores">
      <div className="creditos-aprobados">
        Creditos aprobados <br />
        de {indicadores?.carreras?.total_creditos || 1}
      </div>
      <div className="trimestres-cursados">
        Trimestres <br />
        cursados
      </div>
      <div className="asignaturas">
        Asignaturas <br />
        aprobadas de {indicadores?.carreras?.total_asignaturas || 1}
      </div>
      <div className="div" />
      <div className="creditos-aprobados-2">
      </div>

      <div className="trimestres-aprobadas" />
    </div>
  )
}

async function getIndicadores(id_usuario) {
  const requestData = {
    id_usuario: id_usuario
  };

  const response = await fetch('http://localhost:3000/api/Indicadores', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(requestData),
  });

  const resultado = await response.json();

  return resultado;
}
export default ContenedorIndicadores;
