'use client'

import React from "react";
import {Logo} from "./Logo";
import Cookies from 'js-cookie';

function CambiarPasswordForm() {
  const id_usuario = Cookies.get("ID") || 1;

  const handleSubmit = async (event) =>{
    event.preventDefault();
    
    const requestData = {
      id_usuario: id_usuario,
      nueva_password: event.target.new_password.value,
      confirmar_password: event.target.confirm_password.value,
    };
    
    const response = await fetch('http://localhost:3000/api/Usuarios/CambiarContrasena', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestData),
    });

    if(response.status == 200){
      alert("Contraseña cambiada");
      document.getElementById("SubmitForm").reset();
    }
    else{
      alert("Hubo problemas al cambiar la contraseña, intentelo de nuevo");
    }
  }

  return (
    <form onSubmit={handleSubmit} id="SubmitForm" method="POST" className="cambiar-password" >
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
    
    <div> <input required type='password' className="new-password-textbox" id="new_password" name="new-password"/> </div>
    <input required type= 'text' className="id-textbox" name="id-usuario" id="id_usuario" value={id_usuario}/>
    <input required type='password' className="confirm-password" id="confirm_password" name="confirm-password" />

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