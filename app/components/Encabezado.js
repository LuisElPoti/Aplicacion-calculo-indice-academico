import React from 'react'

function getFormattedDate() {
  const months = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
  ];

  const currentDate = new Date();
  const day = currentDate.getDate();
  const month = months[currentDate.getMonth()];
  const year = currentDate.getFullYear();

  const formattedDate = `${month} ${day}, ${year}`;
  return formattedDate;
}

function Encabezado({ userName, role, menuTitle, color }) {
  return (
    <div className={`encabezado ${color}`}>
      <div className="perfil">
        <div className="nombre-rol">
          <div className="paola-salda-a ">{userName}</div>
          <div className={`estudiante ${color}`}>{role}</div>
        </div>
        <img className="foto-perfil" alt="Foto perfil" src="/images/foto-perfil.svg" />
        <img className="chevron-down" alt="Chevron down" src="/images/chevron-down.svg" />
      </div>
      <div className="titulo-fecha">
        <div className="men-principal">{menuTitle}</div>
        <div className={`junio ${color}`}>{getFormattedDate()}</div>
      </div>
    </div>
  );
}

export default Encabezado;
