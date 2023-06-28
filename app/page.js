"use client";
import Link from 'next/link';
import Encabezado from './components/Encabezado';
import ContenedorInformacion from './components/ContenedorInformacion';
import ContenedorIndiceGeneral from './components/ContenedorIndiceGeneral';
import ContenedorIndicadores from './components/ContenedorIndicadores';


 function page() {


  return (
<>
    <Encabezado />
    <ContenedorInformacion />
    <ContenedorIndiceGeneral />
    <ContenedorIndicadores />
</>



  
  )
}
export default page
