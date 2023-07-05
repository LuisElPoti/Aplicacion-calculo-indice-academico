"use client"
import { useState } from "react";
import FiltroReportes from "./FiltroReportes"

function CrearSeccionForm() {

    const [Asignatura, setAsignatura] = useState("");

    const menuItemsAsignatura = [
        { value: 'CBM207', label: 'Matematica Discreta' },
        { value: 'CBM301', label: 'Física II' },
        { value: 'IDS402', label: 'Aseguramiento de Calidad' },
      ];
    


  return (
    <form action="" method="">

        <div className="form-crearSeccion">

        <label for='Aula'>Aula</label>
        <input type="text" className="textbox-crearSeccion" name="Aula"/>

        <label for='Asinatura'>Asignatura</label>
        <FiltroReportes items={menuItemsAsignatura} label="Asignatura" onChange={""} selectedItem={Asignatura}/>

        <label for='CantidadCupos'>Cantidad de Cupos</label>
        <input type="text" className="textbox-crearSeccion" name="CantidadCupos"/>

        <label for='Profesor'>Profesor</label>
        <input type="text" className="textbox-crearSeccion" name="Aula"/>

        </div>

    </form>
  )
}

export default CrearSeccionForm