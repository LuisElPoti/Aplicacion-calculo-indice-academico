import TableComponent from "@/app/components/TableComponentFilter"
import TablaBasica from "@/app/components/TablaBasica"
import CrearUsuarioForm from "@/app/components/CrearUsuarioForm";
import { CiTrash } from "react-icons/ci";


export default function ListadoUsuarios() {
    const headers = ['Tipo', 'ID', 'Nombre', 'Documento', 'Carrera', 'Area', 'Opciones'];
    const click = () => console.log('i was clicked');

const data = [
  {
    Tipo: 'Estudiante',
    Id: '1104220',
    Nombre: 'Allen Silverio',
    Documento: '40230256329',
    Carrera: 'Ingeniería de Software',
    Area: 'Ingenierías',
    Opciones: <button onClick={""}><CiTrash style={{width:"50px", height:"25px", color:'#DE5462'}} /></button> // Boton para eliminar registro
  },
  {
    Tipo: 'Estudiante',
    Id: '1104220',
    Nombre: 'Allen Silverio',
    Documento: '40230256329',
    Carrera: 'Ingeniería de Software',
    Area: 'Ingenierías',
    Opciones: <button onClick={""}><CiTrash style={{width:"50px", height:"25px", color:'#DE5462'}} /></button> // Boton para eliminar registro
  }
  // Add more data rows as needed
];


  return (
    <>

    <TableComponent headers={headers} data={data}/>
    <div className="mt-5">
    <CrearUsuarioForm buttonText={'Actualizar Datos'}/>   
    </div>
    
    </>

    
  )
}
