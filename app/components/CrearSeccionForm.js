"use client"
import { useEffect, useState } from "react";
import FiltroReportes from "./FiltroReportes"
import DiasSemanaSelector from "./DiasSemanaSelector";
import DynamicSelect from "./DynamicSelect";
import CardHorario from "./CardHorario";
import BotonGuardar from "./BotonGuardar";
import axios from 'axios';

function CrearSeccionForm() {
    const [capacidad, setCapacidad] = useState('');
    const [asignatura, setAsignatura] = useState('');
    const [asignaturas, setAsignaturas] = useState([]);
    const [profesor, setProfesor] = useState('');
    const [profesores, setProfesores] = useState([]);
    const [cupo, setCupo] = useState('');
    const [diasSeleccionados, setDiasSeleccionados] = useState([]);
    const [horarios, setHorarios] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const responseAsignatura = await axios.get("../api/Asignatura");
                const asignaturasData = responseAsignatura.data;
                const asignaturasOptions = asignaturasData.map(asignatura => ({
                  value: asignatura.id,
                  label: asignatura.nombre,
                }));
                setAsignaturas(asignaturasOptions);

                // Establecer el valor inicial de asignatura
                if (asignaturasOptions.length > 0) {
                    setAsignatura(asignaturasOptions[0].value);
                }
            } catch (error) {
                console.error("Error al obtener las asignaturas:", error);
            }
        };
      
        fetchData();
    }, []);

    useEffect(() => {
        const fetchProfesores = async () => {
            if (asignatura) {
                const profesoresData = await getProfesores(asignatura);
                const profesoresFormatted = profesoresData.map((profesor) => ({
                    value: profesor.id,
                    label: profesor.nombre,
                }));
                setProfesores(profesoresFormatted);

                // Establecer el valor inicial de profesor
                if (profesoresFormatted.length > 0) {
                    setProfesor(profesoresFormatted[0].value);
                }
            }
        };

        fetchProfesores();
    }, [asignatura]);

    const handleAsignaturaChange = async (event) => {
        const selectedAsignatura = event.target.value;
        setAsignatura(selectedAsignatura);
        const profesoresData = await getProfesores(selectedAsignatura);
        const profesoresFormatted = profesoresData.map((profesor) => ({
            value: profesor.id,
            label: profesor.nombre,
        }));
        setProfesores(profesoresFormatted);
    };
      
    const handleProfesorChange = (event) => {
        setProfesor(event.target.value);
    };
    
    const handleAulaChange = (selectedAula, index) => {
        const newHorarios = [...horarios];
        newHorarios[index].aula = selectedAula;
        setHorarios(newHorarios);
    };      

    const handleCupoChange = (event) => {
        setCupo(event.target.value);
    };

    const handleDiaSeleccionado = (event) => {
        const { value, checked } = event.target;
        if (checked) {
            // Agregar el día seleccionado a la lista de horarios
            setHorarios([...horarios, {
                dia: value,
                horaInicio: '',
                horaFin: '',
                aula: ''
            }]);
        } else {
            // Remover el horario correspondiente al día deseleccionado
            setHorarios(horarios.filter((horario) => horario.dia !== value));
        }
    };

    const handleHoraInicioChange = (event, index) => {
        const newHorarios = [...horarios];
        newHorarios[index].horaInicio = event.target.value;
        setHorarios(newHorarios);
    };

    const handleHoraFinChange = (event, index) => {
        const newHorarios = [...horarios];
        newHorarios[index].horaFin = event.target.value;
        setHorarios(newHorarios);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
    
        const data = {
          capacidad: cupo,
          asignatura: parseInt(asignatura),
          profesor: parseInt(profesor),
          cupo: cupo
        };
    
        try {
            // Crear la sección
            const responseSeccion = await axios.post('../api/CrearSeccion', data);
            console.log(responseSeccion.data);
            const seccionId = responseSeccion.data.id;
            
            // Crear los horarios de sección
            for (const horario of horarios) {
                const horarioData = {
                    dia: horario.dia,
                    horaInicio: parseInt(horario.horaInicio),
                    horaFin: parseInt(horario.horaFin),
                    idSeccion: seccionId,
                    aula: horario.aula
                };

                const responseHorario = await axios.post('../api/CrearHorarioSeccion', horarioData);
                console.log(responseHorario.data);
            }

            console.log("Sección y horarios creados con éxito");
            alert("Sección y horarios creados con éxito");
            // Hacer algo con la respuesta, como redireccionar a otra página o mostrar un mensaje de éxito
        } catch (error) {
            alert("Error al enviar la solicitud POST");
            console.error('Error al enviar la solicitud POST:', error);
            // Mostrar un mensaje de error al usuario
        }
    };

    return (
        <form method="" onSubmit={handleSubmit}>

            <div className="form-crearSeccion flex">
                <div className="fields-crearSeccion w-1/2">
                    <div className="formElement-crearSeccion">
                        <DynamicSelect
                            options={asignaturas}
                            label="Asignatura"
                            value={asignatura}
                            onChange={handleAsignaturaChange}
                            selectClassName={'select-crearSeccion'}
                        />
                    </div>

                    <div className="formElement-crearSeccion">
                        <DynamicSelect
                            options={profesores}
                            label="Profesor"
                            value={profesor}
                            onChange={handleProfesorChange}
                            selectClassName={'select-crearSeccion'}
                        />
                    </div>

                    <div className="formElement-crearSeccion">
                        <label htmlFor='CantidadCupos'>Cantidad de Cupos</label>
                        <input type="number" className="textbox-crearSeccion w-1/2 p-5" name="CantidadCupos" onChange={handleCupoChange} />
                    </div>

                    <div className="formElement-crearSeccion">
                        <DiasSemanaSelector onChange={handleDiaSeleccionado} />
                    </div>

                    <BotonGuardar texto={"Crear Seccion"} className={"amarillo"} onClick={""} />
                </div>

                <div className="horarios-crearSeccion ml-12">
                    <h6>Horarios</h6>
                    <div className="mt-5">
                        {horarios.map((horario, index) => (
                            <CardHorario
                                key={index}
                                dia={horario.dia}
                                horaInicio={horario.horaInicio}
                                horaFin={horario.horaFin}
                                aulaSeleccionada={horario.aula}
                                handleHoraInicioChange={(event) => handleHoraInicioChange(event, index)}
                                handleHoraFinChange={(event) => handleHoraFinChange(event, index)}
                                handleAulaChange={(selectedAula) => handleAulaChange(selectedAula, index)}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </form>
    )
}

async function getProfesores(asignaturaId){
    const requestData = {
        asignatura: parseInt(asignaturaId),
    };
    const response = await axios.get('../api/ObtenerProfesor', {
        params: requestData,
    });
    
    const profesores = response.data;
    return profesores;
}

export default CrearSeccionForm;