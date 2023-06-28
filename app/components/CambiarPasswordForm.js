import React from "react";
import {Logo} from "./Logo";

function CambiarPasswordForm() {
  return (
    <form action="" method="" className="cambiar-password" >
    <Logo
      gradehubStyle={{
        fontSize: "32px",
        marginTop: "-1.00px",
      }}
      logo="image.png"
      style={{
        left: "183px",
        position: "absolute",
        top: "113px",
      }}
    />
    <div className="ID">ID</div>
    <div className="nueva-contrase-a">Nueva Contraseña</div>
    <div className="confimar-contrase-a">Confimar contraseña</div>
    <div className="new-password-textbox" />
    <div className="id-textbox" />
    <div className="confirm-password" />

    <button type="submit" className="boton-oscuro" style={{
          left: "159px",
          position: "absolute",
          top: "619px",
        }}
        >
        <div className="acceder">Cambiar Contraseña</div>
      </button>
    
    <div className="cambiar-contrase-a">Cambiar Contraseña</div>
  </form>
  )
}

export default CambiarPasswordForm;