import Image from "next/image"
import {Logo} from "./Logo"

function MenuPrincipalAdmin() {
  return (
    <div className="menu-principal">
        <div className="frame">
          <div className="menu-principal-menu">
          
          <img className="bar-chart" alt="Bar chart" src="/icons/bar-chart.svg"/>
            
            <div className="men-principal menu-item">Menú Principal</div>
          </div>
          <div className="asignatura-menu-item menu-item">

          <img className="book" alt="Book" src="/icons/book.svg"/>
        
            <div className="asignaturas">Asignaturas</div>    
            <img className="chevron-down" alt="Chevron down" src="/icons/chevron-down.svg"/>
          </div>
          <div className="calificaciones-menu menu-item">

             <img className="icon-file-text" alt="Icon file text" src="/icons/file-text.svg"/>
            
            <div className="calificaciones">Secciones</div>
          </div>

          <div className="calificaciones-menu menu-item">

             <img className="icon-file-text" alt="Icon file text" src="/icons/user.svg"/>
            
            <div className="calificaciones">Usuarios</div>
          </div>

        </div>
        <div className="logout-menu-item">
          <img className="log-in" alt="Log in" src="/icons/log-out.svg" />
          <div className="cerrar-sesi-n">Cerrar sesión</div>
        </div>
        <Image src="/images/LogoAmarillo.svg" width={200} height={300} style={{left: "46px",
            position: "absolute",
            top: "65px",}}></Image>

      
      </div>
  )
}

export default MenuPrincipalAdmin;

