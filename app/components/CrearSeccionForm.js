"use client"
import { useState } from "react";
import FiltroReportes from "./FiltroReportes"
import DiasSemanaSelector from "./DiasSemanaSelector";
import DynamicSelect from "./DynamicSelect";
import CardHorario from "./CardHorario";
import BotonGuardar from "./BotonGuardar";

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

    //onChange del DiaSemanaSelector crear un array con los días seleccionados
    const [diasSeleccionados, setDiasSeleccionados] = useState([]); // Este es al array que contiene los días selecionados

    const handleDiaSeleccionado = (event) => {
        const { value, checked } = event.target;
        if (checked) {
            // Agregar el día seleccionado a la lista de días seleccionados
            setDiasSeleccionados([...diasSeleccionados, value]);
        } else {
            // Remover el día deseleccionado de la lista de días seleccionados
            setDiasSeleccionados(diasSeleccionados.filter((dia) => dia !== value));
        }
    };

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
                        <DiasSemanaSelector onChange={handleDiaSeleccionado} />
                    </div>

                <BotonGuardar texto={"Crear Seccion"} className={"amarillo"} onClick={""} />

                </div>

                <div className="horarios-crearSeccion ml-12">
                    <h6>Horarios</h6>
                    <div className="mt-5">
                        {diasSeleccionados.map((dia) => (
                            <CardHorario dia={dia}/>
                        ))}
                    </div>

                </div>



            </div>


        </form>
    )
}

export default CrearSeccionForm