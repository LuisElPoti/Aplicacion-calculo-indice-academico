"use client"
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Sidebar from '../components/Sidebar';
import EstudianteMenuPrincipal from "./Estudiante/MenuPrincipal";
import EstudianteReporteCalificaciones from "../Estudiante/ReporteCalificaciones";
import EstudianteReporteSeleccion from "../Estudiante/ReporteSeleccion";
import Login from "../Login";

import dynamic from 'next/dynamic';


function App() {
  const router = useRouter();
  const { pathname } = router;

  let Component = null;

  switch (pathname) {
    case '/Estudiante/MenuPrincipal':
      Component = EstudianteMenuPrincipal;
      break;
    case '/Estudiante/Asignaturas':
      Component = Reports;
      break;
    case '/Estudiante/ReporteSeleccion':
      Component = EstudianteReporteSeleccion;
      break;
    case '/Estudiante/SeleccionAsignaturas':
      Component = EstudianteReporteSeleccion;
      break;
    case '/Estudiante/ReporteCalificaciones':
      Component = EstudianteReporteCalificaciones;
      break;
    case '/Login':
      Component = Login;
      break;
    default:
      Component = () => <h1>Page not found</h1>;
  }

  return (
    <>
      <Sidebar />
      <Component />
    </>
  );
}

export default App;