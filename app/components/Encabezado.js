"use client"
import React, { useState, useEffect } from 'react';
import { AiOutlineDown, AiOutlineUp } from 'react-icons/ai';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

function getFormattedDate() {
  const months = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
  ];

  const currentDate = new Date();
  const day = currentDate.getDate();
  const month = months[currentDate.getMonth()];
  const year = currentDate.getFullYear();

  const formattedDate = `${month} ${day}, ${year}`;
  return formattedDate;
}

function Encabezado({ userName }) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const currentRoute = usePathname();

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  useEffect(() => {
    let menuTitle;
    let color;
    let role;

    switch (currentRoute) {
      // Pantallas Estudiante
      case '/Estudiante':
        menuTitle = 'Root of Estudiante';
        color = 'color-estudiante'; // replace with actual color value
        role = 'Estudiante'
        break;

      case '/Estudiante/MenuPrincipal':
        menuTitle = 'Menú Principal';
        color = 'color-estudiante'; // replace with actual color value
        role = 'Estudiante'
        break;

      case '/Estudiante/ReporteCalificaciones':
        menuTitle = 'Reporte de Calificaciones';
        color = 'color-estudiante'; // replace with actual color value
        role = 'Estudiante'
        break;

      case '/Estudiante/ReporteSeleccion':
        menuTitle = 'Reporte de Selección';
        color = 'color-estudiante'; // replace with actual color value
        role = 'Estudiante'
        break;

        case '/Estudiante/cambiarPassword':
          menuTitle = 'Cambiar Contraseña';
          color = 'color-estudiante'; // replace with actual color value
          role = 'Estudiante'
          break;

        case '/Estudiante/SeleccionAsignatura':
          menuTitle = 'Seleccionar Asignaturas';
          color = 'color-estudiante'; // replace with actual color value
          role = 'Estudiante'
          break;


   // Pantallas Profesor
   case '/Profesor':
    menuTitle = 'Menu Principal Profesor ';
    color = 'color-profesor'; // replace with actual color value
    role = '  Profesor'
    break;

  case '/Profesor/ListadoEstudiantes':
    menuTitle = 'Listado de Estudiantes';
    color = 'color-profesor'; // replace with actual color value
    role = 'Profesor'
    break;

    case '/Profesor/CalificarSeccion':
      menuTitle = 'Calificar Estudiantes';
      color = 'color-profesor'; // replace with actual color value
      role = 'Profesor'
      break;

      

      // Pantallas Admin
      case '/Administrador':
        menuTitle = 'Root of administrador';
        color = 'color-admin'; // replace with actual color value
        role = 'Administrador'
        break;

      case '/Administrador/CalcularIndice':
        menuTitle = 'Calcular Indice de Estudiante';
        color = 'color-admin'; // replace with actual color value
        role = 'Administrador'
        break;

      case '/Administrador/CrearAsignatura':
        menuTitle = 'Crear Asignatura';
        color = 'color-admin'; // replace with actual color value
        role = 'Administrador'
        break;

      case '/Administrador/CrearUsuario':
        menuTitle = 'Crear Usuario';
        color = 'color-admin'; // replace with actual color value
        role = 'Administrador'
        break;

        case '/Administrador/ListadoUsuarios':
          menuTitle = 'Listado de Usuarios del Sistema';
          color = 'color-admin'; // replace with actual color value
          role = 'Administrador'
          break;

          case '/Administrador/ListadoAsignaturas':
            menuTitle = 'Listado de Asignaturas del Sistema';
            color = 'color-admin'; // replace with actual color value
            role = 'Administrador'
            break;

          case '/Administrador/CrearSeccion':
          menuTitle = 'Crear nueva seccion';
          color = 'color-admin'; // replace with actual color value
          role = 'Administrador'
          break;

          case '/Administrador/ListadoSecciones':
          menuTitle = 'Listado de secciones';
          color = 'color-admin'; // replace with actual color value
          role = 'Administrador'
          break;



      // add more cases as needed...
      default:
        menuTitle = 'Root';
        color = 'color-estudiante';
        role = 'Administrador'
    }

    setMenuTitle(menuTitle);
    setColor(color);
    setRole(role);
    
  }, [currentRoute]);

  const [menuTitle, setMenuTitle] = useState('');
  const [color, setColor] = useState('');
  const [role, setRole] = useState('');


  return (
    <div className={`encabezado ${color}`}>
      <div className="perfil">
        <div className="nombre-rol">
          <div className="paola-salda-a">{userName}</div>
          <div className={`estudiante ${color}`}>{role}</div>
        </div>
        <img className="foto-perfil" alt="Foto perfil" src="/images/foto-perfil.svg" />
        <button onClick={toggleDropdown}>
          {isDropdownOpen ? (
            <AiOutlineUp style={{ color: 'black' }} />
          ) : (
            <AiOutlineDown style={{ color: 'black' }} />
          )}
        </button>
        {isDropdownOpen && (
          <div className="dropdown">
            <Link href="/Estudiante/cambiarPassword" style={{ display: 'block' }}>
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

