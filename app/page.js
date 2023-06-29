import Link from 'next/link';
import TablaBasica from './components/TablaBasica';


 function page() {

    const headers = ['Asignatura', 'Seccion', 'Aula', 'Horario', 'Profesor'];

    const data = [
      { Asignatura: 'Estructuras de Datos - IDS305', Seccion: 1, Aula: 'GC-303', Horario: 'LU-MI 14/16', Profesor: 'Allen Silverio' },
      { Asignatura: 'Estructuras de Datos - IDS305', Seccion: 2, Aula: 'GC-303', Horario: 'LU-MI 16/18', Profesor: 'Allen Silverio' },
    ];

  return (
    <>
    <div>
      <h1>My App</h1>
      <TablaBasica headers={headers} data={data} />
    </div>
  
    </>
   
  )
}
export default page
