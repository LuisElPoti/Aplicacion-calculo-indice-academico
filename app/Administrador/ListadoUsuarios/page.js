"use client"
import TableComponent from "@/app/components/TableComponentFilter"
import TablaBasica from "@/app/components/TablaBasica"
import CrearUsuarioForm from "@/app/components/CrearUsuarioForm";
import { CiTrash, CiPen } from "react-icons/ci";
import { useState } from "react";


export default function ListadoUsuarios() {

// Renderizado condicional para hacer que aparezca el contenedor de editar

const [showEditContainer, setShowEditContainer] = useState(false);

const handleEditClick = () => {
  setShowEditContainer(!showEditContainer)
};

// Headers de la tabla
const headers = ['Tipo', 'ID', 'Nombre', 'Documento', 'Carrera', 'Area', 'Eliminar', 'Editar'];
// Insertar Datos a la tabla en forma de un array de objetos, siempre enviar "OPCIONES" y "EDITAR" en el array
const data = [
  {
    Tipo: 'Estudiante',
    Id: '1104220',
    Nombre: 'Allen Silverio',
    Documento: '40230256329',
    Carrera: 'Ingeniería de Software',
    Area: 'Ingenierías',
    Opciones: <button onClick={""}><CiTrash style={{width:"50px", height:"25px", color:'#DE5462'}} /></button>,// Boton para eliminar registro
    Editar: <button onClick={handleEditClick}><CiPen style={{width:"50px", height:"25px", color:'gray'}} /></button>
  },

  {
    Tipo: 'Estudiante',
    Id: '1104220',
    Nombre: 'Allen Silverio',
    Documento: '40230256329',
    Carrera: 'Ingeniería de Software',
    Area: 'Ingenierías',
    Opciones: <button onClick={""}><CiTrash style={{width:"50px", height:"25px", color:'#DE5462'}} /></button>,// Boton para eliminar registro
    Editar: <button onClick={handleEditClick}><CiPen style={{width:"50px", height:"25px", color:'gray'}} /></button>
  },
  
  // Add more data rows as needed
];


  return (
    <>

    <TableComponent headers={headers} data={data}/>
    <div className="mt-5">
    {showEditContainer && <CrearUsuarioForm buttonText={'Actualizar Datos'}/> }
    
    </div>
    
    </>

    
  )
}
