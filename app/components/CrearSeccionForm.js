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
  const [aulaSeleccionada, setAulaSeleccionada] = useState('');
  const [horarios, setHorarios] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseAsignatura = await axios.get("../api/Asignatura");
        const asignaturasData = responseAsignatura.data;
        const asignaturasOptions = asignaturasData.map(asignatura => ({
          value: asignatura.id,
          label: asignatura.nombre,
        }));
        console.log(asignaturasOptions)
        setAsignaturas(asignaturasOptions);
      } catch (error) {
        console.error("Error al obtener las asignaturas:", error);
      }
    };

    fetchData();
  }, []);

  const handleAsignaturaChange = async (event) => {
    const selectedAsignatura = event.target.value;
    setAsignatura(selectedAsignatura);
    const profesoresData = await getProfesores(selectedAsignatura);
    const ProfesoresFormatted = profesoresData.map((profesor) => ({
      value: profesor.id,
      label: profesor.nombre,
    }));
    setProfesores(ProfesoresFormatted);
  };

  const handleProfesorChange = (event) => {
    setProfesor(event.target.value);
  };

  const handleAulaChange = (selectedAula) => {
    setAulaSeleccionada(selectedAula);
  };

  const handleCupoChange = (event) => {
    setCupo(event.target.value);
  };

  const handleDiaSeleccionado = (event) => {
    const { value, checked } = event.target;
    if (checked) {
      setDiasSeleccionados((prevDias) => [...prevDias, value]);
      setHorarios((prevHorarios) => ({
        ...prevHorarios,
        [value]: { horaInicio: '', horaFin: '' }
      }));
    } else {
      setDiasSeleccionados((prevDias) => prevDias.filter((dia) => dia !== value));
      setHorarios((prevHorarios) => {
        const { [value]: deletedHora, ...rest } = prevHorarios;
        return rest;
      });
    }
  };

  const handleHoraInicioChange = (dia, value) => {
    setHorarios((prevHorarios) => ({
      ...prevHorarios,
      [dia]: { ...prevHorarios[dia], horaInicio: value }
    }));
  };

  const handleHoraFinChange = (dia, value) => {
    setHorarios((prevHorarios) => ({
      ...prevHorarios,
      [dia]: { ...prevHorarios[dia], horaFin: value }
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = {
      capacidad: cupo,
      asignatura: asignatura,
      profesor: profesor,
      cupo: cupo
    };

    try {
      // Crear la sección
      const responseSeccion = await axios.post('../api/CrearSeccion', data);
      console.log(responseSeccion.data);
      const seccionId = responseSeccion.data.id;

      // Crear los horarios de sección
      for (const dia of diasSeleccionados) {
        const horario = horarios[dia];
        const horarioData = {
          dia: dia,
          horaInicio: parseInt(horario.horaInicio),
          horaFin: parseInt(horario.horaFin),
          idSeccion: seccionId,
          aula: aulaSeleccionada
        };
        console.log(horarioData);

        const responseHorario = await axios.post('../api/CrearHorarioSeccion', horarioData);
        console.log(responseHorario.data);
      }

      console.log("Sección y horarios creados con éxito");
      alert("Sección y horarios creados con éxito");
    } catch (error) {
      alert("Error al enviar la solicitud POST");
      console.error('Error al enviar la solicitud POST:', error);
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
                        {diasSeleccionados.map((dia, index) => (
                            <CardHorario key={index} dia={dia} horaInicio={horaInicio} horaFin={horaFin} 
                                handleHoraInicioChange={handleHoraInicioChange} handleHoraFinChange={handleHoraFinChange} handleAulaChange={handleAulaChange}/>
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
    console.log(asignaturaId)
    const response = await axios.get('../api/ObtenerProfesor', {
        params: requestData,
    });
    
    const profesores = response.data;
    return profesores;
}

export default CrearSeccionForm;