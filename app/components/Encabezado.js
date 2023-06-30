"use client"
import React, { useState } from 'react'
import {AiOutlineDown, AiOutlineUp} from "react-icons/ai";
import Link from 'next/link';

function getFormattedDate() {
  // ...your existing code...
}

function Encabezado({ userName, role, menuTitle, color }) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  }

  return (
    <div className={`encabezado ${color}`}>
      <div className="perfil">
        <div className="nombre-rol">
          <div className="paola-salda-a ">{userName}</div>
          <div className={`estudiante ${color}`}>{role}</div>
        </div>
        <img className="foto-perfil" alt="Foto perfil" src="/images/foto-perfil.svg" />
        <button onClick={toggleDropdown}>
          {isDropdownOpen ? <AiOutlineUp style={{color:"black"}}/> : <AiOutlineDown style={{color:"black"}}/>}
        </button>
        {isDropdownOpen && (
          <div className="dropdown">
            <Link href="/Estudiante/cambiarPassword" style={{display:"block"}}>
              Cambiar Password
            </Link>
          </div>
        )}
      </div>
      <div className="titulo-fecha">
        <div className="men-principal">{menuTitle}</div>
        <div className={`junio ${color}`}>{getFormattedDate()}</div>
      </div>
    </div>
  );
}

export default Encabezado;

