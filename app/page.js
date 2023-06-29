import Link from 'next/link';
import TablaBasica from './components/TablaBasica';
import Tarjeta from './components/Tarjeta';

 function page() {

    const headers = ['Asignatura', 'Seccion', 'Aula', 'Horario', 'Profesor'];

    const data = [
      { Asignatura: 'Estructuras de Datos - IDS305', Seccion: 1, Aula: 'GC-303', Horario: 'LU-MI 14/16', Profesor: 'Allen Silverio' },
      { Asignatura: 'Estructuras de Datos - IDS305', Seccion: 2, Aula: 'GC-303', Horario: 'LU-MI 16/18', Profesor: 'Allen Silverio' },
    ];

    const headerValues = [
      { headerName: 'ID', headerValue: '1104220' },
      { headerName: 'Nombre', headerValue: 'Allen Silverio' },
      { headerName: 'Programa', headerValue: 'Ingeniería de Software' },
      { headerName: 'Asignatura', headerValue: 'Matematicas' }

    ];

  return (
    <>
    <div>
      <h1>My App</h1>
      
    </div>

    
    <Tarjeta headerValues={headerValues} backgroundColor="#ED6F71"/>

    
  
    </>
   
  )
}
export default page
