"use client"
import { useState } from "react";
import Link from "next/link";
import { AiFillHome, AiFillBook, AiFillStar, AiOutlineDown, AiOutlineUp, AiOutlineProject } from "react-icons/ai";

const Sidebar = () => {
  const [showSubMenu, setShowSubMenu] = useState(false);

  const toggleSubMenu = () => {
    setShowSubMenu(!showSubMenu);
  };

  return (
    <div className=" pl-5 pt-20 text-white h-full sidebar">
      <div className="mb-10 pr-5">
        <img src="/images/logo.svg" alt="Logo" className="w-50  mx-auto" /> {/* adjust this path to your logo */}
      </div>
      <ul className="pl-8">
        <li className="mb-6 flex items-center gap-2 nav-link">
          <AiOutlineProject />
          <Link href="/Estudiante/MenuPrincipal">Menu Principal</Link>
        </li>
        <li className="mb-6 nav-link">
          <div className="flex items-center gap-2 cursor-pointer mb-3" onClick={toggleSubMenu}>
            <AiFillBook />
            <p>Asignaturas</p>
            {showSubMenu ? <AiOutlineUp /> : <AiOutlineDown />}
          </div>
          {showSubMenu && (
            <ul className="ml-6 mb-2">
              <li className="mb-3 nav-link">
                <Link href="/Estudiante/SeleccionAsignatura">Selección de Asignaturas</Link>
              </li>
              <li className="mb-2 nav-link">
                <Link href="/Estudiante/ReporteSeleccion">Reporte de Selección</Link>
              </li>
            </ul>
          )}
        </li>
        <li className="mb-6 flex items-center gap-2 nav-link">
          <AiFillStar />
          <Link href="/Estudiante/ReporteCalificaciones">Calificaciones</Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;

