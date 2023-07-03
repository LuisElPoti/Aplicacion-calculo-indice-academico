'use client'
import React from 'react';
import { Logo } from "./Logo";
import { useRouter } from 'next/navigation';
//import { toast } from 'react-toastify';


export const LoginForm = ({ style }) => {
  const router = useRouter();

  const handleSubmit = async (event) => {
    event.preventDefault();
    //toast.info("Usuario o contraseña incorrectos");
    console.log("Login no exitoso");
    const requestData = {
      id_usuario: event.target.id_usuario.value,
      password_usuario: event.target.password_usuario.value
    };

    const response = await fetch('http://localhost:3000/api/Usuarios/LogIn', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestData),
    });

    if (response.status == 200) {
      console.log("LogIn exitoso");
      let response_json = await response.json();
      const rol = response_json.rol;
      router.push(`/${rol}/MenuPrincipal`);
    }
    else {
      //toast.info("Usuario o contraseña incorrectos");
      console.log("Login no exitoso");
    }
  }

  return (
    <form onSubmit={handleSubmit} method="POST" className="login-form" style={style}>
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

      {/* Textos del Login */}
      <div className="login">Login</div>
      <div className="ID">ID</div>
      <div className="contrase-a">Contraseña</div>


      {/* Boton de Acceder */}
      <button type="submit" className="boton-oscuro" style={{
        left: "159px",
        position: "absolute",
        top: "619px",
      }}
      >
        <div className="acceder">Acceder</div>
      </button>

      {/* Textbox para ingresar Usuario */}
      <div className="txt-login-id">
        <input type='text' id="id_usuario" className="ingrese-su-ID" required name="id-usuario" />
      </div>

      <div className="password-login">
        <input type='password' id="password_usuario" className="ingrese-su-contrase" required name="password-usuario" />
      </div>
    </form>
  );
};