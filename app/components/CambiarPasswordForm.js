import React from "react";
import {Logo} from "./Logo";
import { CambiarContraseña } from "@/actions/cambiarContrasena";
import { cookies } from 'next/headers'


function CambiarPasswordForm() {
  const id_usuario = cookies().get('ID').value
  return (
    <form action={CambiarContraseña} method="" className="cambiar-password" >
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

    
    <div> <input required type='password' className="new-password-textbox" name="new-password"/> </div>
    <input readonly required type= 'text' className="id-textbox" name="id-usuario" value={id_usuario}/>
    <input required type='password' className="confirm-password" name="confirm-password" />

    <button type="submit" className="boton-oscuro" style={{
          left: "110px",
          position: "absolute",
          top: "650px",
        }}
        >
        <div className="acceder">Cambiar Contraseña</div>
      </button>
    
    <div className="cambiar-contrase-a">Cambiar Contraseña</div>
  </form>
  )
}

export default CambiarPasswordForm;