"use client"
import { useState } from "react";
import Link from "next/link";
import { AiFillHome, AiFillBook, AiFillStar, AiOutlineDown, AiOutlineUp, AiOutlineProject } from "react-icons/ai";
import {CiLogout} from  "react-icons/ci";

const Sidebar = () => {
  const [showSubMenuAsignatura, setShowSubMenuAsignatura] = useState(false);

  const toggleSubMenuAsignatura = () => {
    setShowSubMenuAsignatura(!showSubMenuAsignatura);
  };


  return (
    <div className=" pl-5 pt-20 text-white h-full sidebar">
      <div className="mb-10 pr-5">
        <img src="/images/LogoMorado.svg" alt="Logo" className="w-50  mx-auto" /> {/* adjust this path to your logo */}
      </div>
      <ul className="pl-8">
        <li className="mb-6 flex items-center gap-2 nav-link">
          <AiOutlineProject />
          <Link href="/Profesor">Menu Principal</Link>
        </li>

        <li className="mb-6 flex items-center gap-2 nav-link">
          <AiOutlineProject />
          <Link href="/Profesor/CalificarSeccion">Calificaciones</Link>
        </li>
        <li className="mb-6 flex items-center gap-2 nav-link">
          <AiFillStar />
          <Link href="/Profesor/ListadoEstudiantes">Secciones</Link>
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

