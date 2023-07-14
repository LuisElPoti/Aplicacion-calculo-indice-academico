'use client'
import { useState } from "react";
import Link from "next/link";
import { AiFillHome, AiFillBook, AiFillStar, AiOutlineDown, AiOutlineUp, AiOutlineProject } from "react-icons/ai";
import { CiLogout } from "react-icons/ci";

const Sidebar = () => {
  const [showSubMenuAsignatura, setShowSubMenuAsignatura] = useState(false);
  const [showSubMenuUsuario, setShowSubMenuUsuario] = useState(false);
  const [showSubMenuSecciones, setShowSubMenuSecciones] = useState(false);

  const toggleSubMenuAsignatura = () => {
    setShowSubMenuAsignatura(!showSubMenuAsignatura);
  };

  const toggleSubMenuUsuario = () => {
    setShowSubMenuUsuario(!showSubMenuUsuario);
  };

  const toggleSubMenuSecciones = () => {
    setShowSubMenuSecciones(!showSubMenuSecciones);
  };

  return (
    <div className="pl-5 pt-20 text-white sidebar">
      <div className="mb-10 pr-5">
        <img src="/images/LogoAmarillo.svg" alt="Logo" className="w-50  mx-auto" /> {/* adjust this path to your logo */}
      </div>
      <ul className="pl-8">
        <li className="mb-6 flex items-center gap-2 nav-link">
          <AiOutlineProject />
          <Link href="/Administrador">Menu Principal</Link>
        </li>

        <li className="mb-6 nav-link">
          <div className="flex items-center gap-2 cursor-pointer mb-3" onClick={toggleSubMenuAsignatura}>
            <AiFillBook />
            <p>Asignaturas</p>
            {showSubMenuAsignatura ? <AiOutlineUp /> : <AiOutlineDown />}
          </div>
          {showSubMenuAsignatura && (
            <ul className="ml-6 mb-2">
              <li className="mb-3 nav-link">
                <Link href="/Administrador/CrearAsignatura">Registrar Asignatura</Link>
              </li>
              <li className="mb-2 nav-link">
                <Link href="/Administrador/ListadoAsignaturas">Listado de Asignaturas</Link>
              </li>
            </ul>
          )}
        </li>

        <li className="mb-6 nav-link">
          <div className="flex items-center gap-2 cursor-pointer mb-3" onClick={toggleSubMenuSecciones}>
            <AiFillStar />
            <p>Secciones</p>
            {showSubMenuSecciones ? <AiOutlineUp /> : <AiOutlineDown />}
          </div>
          {showSubMenuSecciones && (
            <ul className="ml-6 mb-2">
              {/* Add your Secciones options here */}
              <li className="mb-3 nav-link">
                <Link href="/Administrador/CrearSeccion">Crear Seccion</Link>
              </li>
              <li className="mb-2 nav-link">
                <Link href="/Administrador/ListadoSecciones">Listado de Secciones</Link>
              </li>
            </ul>
          )}
        </li>

        <li className="mb-6 nav-link">
          <div className="flex items-center gap-2 cursor-pointer mb-3" onClick={toggleSubMenuUsuario}>
            <AiFillBook />
            <p>Usuarios</p>
            {showSubMenuUsuario ? <AiOutlineUp /> : <AiOutlineDown />}
          </div>
          {showSubMenuUsuario && (
            <ul className="ml-6 mb-2">
              <li className="mb-3 nav-link">
                <Link href="/Administrador/CrearUsuario">Crear Usuario</Link>
              </li>
              <li className="mb-2 nav-link">
                <Link href="/Administrador/ListadoUsuarios">Listado de Usuarios</Link>
              </li>
            </ul>
          )}
        </li>

        <li className="mb-6 flex items-center gap-2 nav-link">
          <AiOutlineProject />
          <Link href="/Administrador/CalcularIndice">Calcular Indice</Link>
        </li>

        <div className="mt-auto sidebar-bottom">
          <li className="mb-6 flex items-center gap-2 nav-link">
            <CiLogout style={{ fontWeight: "20px" }} />
            <Link href="/login">Logout</Link>
          </li>
        </div>
      </ul>
    </div>
  );
};

export default Sidebar;


