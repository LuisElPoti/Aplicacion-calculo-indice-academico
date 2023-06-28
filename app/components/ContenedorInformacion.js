import React from 'react'

function ContenedorInformacion() {
  return (
    <div className="contenedor-info" >
    <div className="informacion-general">
      <div className="ID">ID:</div>
      <div className="element">1104220</div>
    </div>
    <div className="div">
      <div className="carrera">Carrera:</div>
      <div className="ingenier-a-de">
        Ingeniería de Software <br />
        IDS
      </div>
    </div>
    <div className="informacion-general-2">
      <div className="indice-trimestral">Indice Trimestral:</div>
      <div className="text-wrapper">3.89</div>
    </div>
    <div className="informacion-general-3">
      <div className="indice-general">Indice General:</div>
      <div className="element-2">3.74</div>
    </div>
    <div className="informacion-general-4">
      <div className="correo-institucional">Correo Institucional:</div>
      <div className="element-est-intec">1104220@est.intec.edu.do</div>
    </div>
    <div className="informaci-n-general">Información General</div>
    <img className="info-general-imagen" alt="Info general imagen" src="images/info-general-imagen.svg" />
  </div>
  )
}

export default ContenedorInformacion;
