"use client"
import React, { useState, useEffect } from 'react';
import DynamicSelect from "./DynamicSelect";

export default function CardHorario({ dia, handleHoraInicioChange, aulaInicial, handleHoraFinChange, handleAulaChange}) {
  const [aulaSeleccionada, setAulaSeleccionada] = useState(aulaInicial);

  useEffect(() => {
    handleAulaChange(aulaInicial);  // Llamar a la función de actualización con el valor inicial del aula al inicializar el componente
  }, []);

  const handleAulaSelectChange = (event) => {
    const selectedAula = event.target.value;
    setAulaSeleccionada(selectedAula);
    handleAulaChange(selectedAula);
  };

  const Aulas = [
    { value: 'GC305', label: 'GC305' },
    { value: 'GC308', label: 'GC308' },
    { value: 'GC306', label: 'GC306' },
  ];
  console.log(aulaSeleccionada)

  return (
    <div className="card-horarios-crearSeccion mt-5">
      <p className="mb-4"><strong>{dia}</strong></p>

      <div className="card-allFields-crearSeccion flex">
        <div className="card-field-crearSeccion flex flex-col">
          <label htmlFor="horaInicio">Hora Inicio</label>
          <input type="time" name="horaInicio" onChange={handleHoraInicioChange} />
        </div>

        <div className="card-field-crearSeccion flex flex-col">
          <label htmlFor="horaFin">Hora Fin</label>
          <input type="time" name="horaFin" onChange={handleHoraFinChange} />
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