import React from 'react'
import {Logo} from './Logo'
import Image from 'next/image'

export default function MenuPrincipalAdmin() {
  return (
    <div className="menu-principal">
        <div className="frame">
          <div className="menu-principal-menu">
          
          <img className="bar-chart" alt="Bar chart" src="/icons/bar-chart.svg"/>
            
            <div className="men-principal">Menú Principal</div>
          </div>
          <div className="asignatura-menu-item">

          <img className="book" alt="Book" src="/icons/book.svg"/>
        
            <div className="asignaturas">Asignaturas</div>    
            <img className="chevron-down" alt="Chevron down" src="/icons/chevron-down.svg"/>
          </div>
          <div className="calificaciones-menu">

             <img className="icon-file-text" alt="Icon file text" src="/icons/file-text.svg"/>
            
            <div className="calificaciones">Secciones</div>
          </div>
          <div className="calificaciones-menu">

             <img className="icon-file-text" alt="Icon user" src="/icons/user.svg"/>
            
            <div className="calificaciones">Usuarios</div>
          </div>


        </div>
        <div className="logout-menu-item">
          <img className="log-in" alt="Log in" src="/icons/log-out.svg" />
          <div className="cerrar-sesi-n">Cerrar sesión</div>
        </div>
        <div className="logo">
          <img className="img" alt="Logo" src="/images/LogoAmarillo.svg" />
        </div>
      </div>
     
  )
}
