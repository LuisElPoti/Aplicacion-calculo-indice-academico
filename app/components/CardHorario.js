"use client"
import React from "react";
import DynamicSelect from "./DynamicSelect";

const CardHorario = ({
  dia,
  horaInicio,
  horaFin,
  handleHoraInicioChange,
  handleHoraFinChange,
  handleAulaChange
}) => {
  const handleAulaSelectChange = (event) => {
    const selectedAula = event.target.value;
    handleAulaChange(selectedAula);
  };

  const Aulas = [
    { value: "GC305", label: "GC305" },
    { value: "GC308", label: "GC308" },
    { value: "GC306", label: "GC306" },
  ];

  return (
    <div className="card-horarios-crearSeccion mt-5">
      <p className="mb-4">
        <strong>{dia}</strong>
      </p>

      <div className="card-allFields-crearSeccion flex">
        <div className="card-field-crearSeccion flex flex-col">
          <label htmlFor="horaInicio">Hora Inicio</label>
          <input
            type="time"
            name="horaInicio"
            value={horaInicio}
            onChange={(event) => handleHoraInicioChange(event.target.value)}
          />
        </div>

        <div className="card-field-crearSeccion flex flex-col">
          <label htmlFor="horaFin">Hora Fin</label>
          <input
            type="time"
            name="horaFin"
            value={horaFin}
            onChange={(event) => handleHoraFinChange(event.target.value)}
          />
        </div>

        <div className="card-field-crearSeccion">
          <DynamicSelect
            options={Aulas}
            label="Aula"
            onChange={handleAulaSelectChange}
            selectClassName={"card-field-crearSeccion"}
          />
        </div>
      </div>
    </div>
  );
};

export default CardHorario;


