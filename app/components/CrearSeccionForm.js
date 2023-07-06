"use client"
import { useState } from "react";
import FiltroReportes from "./FiltroReportes"
import DiasSemanaSelector from "./DiasSemanaSelector";
import DynamicSelect from "./DynamicSelect";
import CardHorario from "./CardHorario";

function CrearSeccionForm() {

    const [asignaturaSeleccionada, setAsignaturaSeleccionada] = useState('');
    const handleAsignaturaSelectChange = (event) => {
        setAsignaturaSeleccionada(event.target.value);
    };

    const [profesorSeleccionado, setProfesorSeleccionadp] = useState('');
    const handleProfesorSelectChange = (event) => {
        setProfesorSeleccionado(event.target.value);
    };

    //Valores del Select

    const menuItemsAsignatura = [
        { value: 'CBM207', label: 'Matematica Discreta' },
        { value: 'CBM301', label: 'Física II' },
        { value: 'IDS402', label: 'Aseguramiento de Calidad' },
    ];

    const menuItemsProfesor = [
        { value: '1104225', label: 'Luis Adames' },
        { value: '1104220', label: 'Allen Silverio' },
    ];



    return (
        <form action="" method="">

            <div className="form-crearSeccion flex">


                <div className="fields-crearSeccion w-1/2">

                    <div className="formElement-crearSeccion">
                        <DynamicSelect
                            options={menuItemsAsignatura}
                            label="Asignatura"
                            value={asignaturaSeleccionada}
                            onChange={handleAsignaturaSelectChange}
                            selectClassName={'select-crearSeccion'}
                        />
                    </div>

                    <div className="formElement-crearSeccion">
                        <DynamicSelect
                            options={menuItemsProfesor}
                            label="Profesor"
                            value={profesorSeleccionado}
                            onChange={handleProfesorSelectChange}
                            selectClassName={'select-crearSeccion'}
                        />
                    </div>

                    <div className="formElement-crearSeccion">
                        <label for='CantidadCupos'>Cantidad de Cupos</label>
                        <input type="number" className="textbox-crearSeccion w-1/2 p-5" name="CantidadCupos" />
                    </div>



                    <div className="formElement-crearSeccion">
                        <DiasSemanaSelector />
                    </div>

                </div>

                <div className="horarios-crearSeccion ml-12">
                <h6>Horarios</h6>
                <div className="mt-5">
                <CardHorario/>
                </div>

                </div>



            </div>



        </form>
    )
}

export default CrearSeccionForm