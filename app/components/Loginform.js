import React from 'react';
import {Logo} from "./Logo";
import {HacerLogin} from "@/actions/login.js";

export const LoginForm = ({ style }) => {
  return (
    <form action={HacerLogin} method="" className="login-form" style={style}>
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
        <input type='text' className="ingrese-su-ID" required name="id-usuario"/>
      </div>
      
      <div className="password-login">
        <input type='password' className="ingrese-su-contrase" required name="password-usuario"/>
      </div>
    </form>
  );
};