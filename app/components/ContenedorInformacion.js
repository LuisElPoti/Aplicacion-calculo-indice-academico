import React, { useEffect, useState } from 'react'

function ContenedorInformacion({id_usuario}) {
  const [datosSesion, setDatosSesion] = useState({});

  useEffect(() => {

    async function fetchData() {
      const newData = await getDatosSesion(id_usuario);
      setDatosSesion(newData);
    }

    fetchData();
  }, [id_usuario]);


  return (
    <div className="contenedor-info" >
    <div className="informacion-general">
      <div className="ID">ID:</div>
      <div className="element">{id_usuario}</div>
    </div>
    <div className="div">
      <div className="carrera">Carrera:</div>
      <div className="ingenier-a-de">
        {datosSesion?.carreras?.nombre || "Ingenieria de Software"} <br />
        {datosSesion?.carreras?.descripcion || "IDS"}
      </div>
    </div>
    <div className="informacion-general-2">
      <div className="indice-trimestral">Indice Trimestral:</div>
      <div className="text-wrapper">{datosSesion?.indice_trimestral}</div>
    </div>
    <div className="informacion-general-3">
      <div className="indice-general">Indice General:</div>
      <div className="element-2">{datosSesion?.indice_general || "3.78"}</div>
    </div>
    <div className="informacion-general-4">
      <div className="correo-institucional">Correo Institucional:</div>
      <div className="element-est-intec">{datosSesion?.correo || "1101101@institucion.edu.do"}</div>
    </div>
    <div className="informaci-n-general">Información General</div>
    <img className="info-general-imagen" alt="Info general imagen" src="/images/info-general-imagen.svg" />
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

export default ContenedorInformacion;
