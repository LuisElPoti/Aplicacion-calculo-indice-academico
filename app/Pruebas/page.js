import { headers } from "next/headers";
import TablaSeleccionOficial from "../components/TablaSeleccionOficial";
import Image from "next/image";

function App() {

  const headers = ["", 'Asignatura', 'Codigo', 'Cupos', 'Seccion', 'Horario', 'Aula', 'Profesor', ""];
  const data = [
    {
        id: '01',
        Asignatura: 'Estructuras de Datos',
        Codigo: 'IDS305',
        Cupos: '',
        Seccion: '',
        Horario: '',
        Aula: '',
        Profesor: '',
        seccionesDisponibles: [{id:'IDS300-1', Asignatura: 'Estructuras de Datos', Codigo:'IDS305', Cupos:'40', Seccion:'01', Horario:'LU-MI 14/16', Aula:'GC402', Profesor:'Allen Silverio'}, 
                              {id:'IDS300-2', Asignatura: 'Estructuras de Datos', Codigo:'IDS305', Cupos:'40', Seccion:'01', Horario:'LU-MI 14/16', Aula:'GC402', Profesor:'Allen Silverio'}]
    },
];

  return (
    <>
     <TablaSeleccionOficial headers={headers} data={data}/>
     
    </>
  );
}

export default App;