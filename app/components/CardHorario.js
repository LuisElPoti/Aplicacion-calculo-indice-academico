"use client"
import React, { useState, useEffect } from 'react';
import DynamicSelect from "./DynamicSelect";

export default function CardHorario({ dia, handleHoraInicioChange, handleHoraFinChange, handleAulaChange}) {
  const Aulas = [
    { value: 'GC305', label: 'GC305' },
    { value: 'GC308', label: 'GC308' },
    { value: 'GC306', label: 'GC306' },
  ];
  
  const [aulaSeleccionada, setAulaSeleccionada] = useState(Aulas[0].value);

  useEffect(() => {
    handleAulaChange(Aulas[0].value);  // Llamar a la función de actualización con el valor inicial del aula al inicializar el componente
  }, []);

  const handleAulaSelectChange = (event) => {
    const selectedAula = event.target.value;
    setAulaSeleccionada(selectedAula);
    handleAulaChange(selectedAula);
  };

  
  console.log(aulaSeleccionada)

  return (
    <div className="card-horarios-crearSeccion mt-5">
      <p className="mb-4"><strong>{dia}</strong></p>

      <div className="card-allFields-crearSeccion flex">
        <div className="card-field-crearSeccion flex flex-col">
          <label htmlFor="horaInicio">Hora Inicio</label>
          <input required type="time" name="horaInicio" onChange={handleHoraInicioChange} />
        </div>

        <div className="card-field-crearSeccion flex flex-col">
          <label htmlFor="horaFin">Hora Fin</label>
          <input required type="time" name="horaFin" onChange={handleHoraFinChange} />
        </div>

        <div className="card-field-crearSeccion">
          <DynamicSelect
            options={Aulas}
            label="Aula"
            value={aulaSeleccionada}
            onChange={handleAulaSelectChange}
            selectClassName={'card-field-crearSeccion'}
          />
        </div>
      </div>
    </div>
  );
}