import React from 'react'


function Encabezado() {
  return (
    <div className="encabezado">
      <div className="perfil">
        <div className="nombre-rol">
          <div className="paola-salda-a">Paola Saldaña</div>
          <div className="estudiante">Estudiante</div>
        </div>
        <img className="foto-perfil" alt="Foto perfil" src="/images/foto-perfil.svg" />
        <img className="chevron-down" alt="Chevron down" src="/images/chevron-down.svg" />
      </div>
      <div className="titulo-fecha">
        <div className="men-principal">Menú Principal</div>
        <div className="junio">Junio 25, 2023</div>
      </div>
    </div>
  )
}

export default Encabezado;
