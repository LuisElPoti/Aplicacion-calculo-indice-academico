import TableComponent from "@/app/components/TableComponentFilter"
import TablaBasica from "@/app/components/TablaBasica"
import CrearUsuarioForm from "@/app/components/CrearUsuarioForm";


export default function ListadoUsuarios() {
    const headers = ['Tipo', 'ID', 'Nombre', 'Documento', 'Carrera', 'Area'];

const data = [
  {
    Tipo: 'Estudiante',
    Id: '1104220',
    Nombre: 'Allen Silverio',
    Documento: '40230256329',
    Carrera: 'Ingeniería de Software',
    Area: 'Ingenierías'
  },
  {
    Tipo: 'Profesor',
    Id: '1104225',
    Nombre: 'Pedro Martinez',
    Documento: '40000000000',
    Carrera: 'Ingeniería Mecánica',
    Area: 'Ingenierías'
  },
  
  
  // Add more data rows as needed
];


  return (
    <>
    
    

    <TableComponent headers={headers} data={data}/>
    <div className="mt-5">
    <CrearUsuarioForm />   
    </div>
    
    </>

    
  )
}
