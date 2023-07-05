import { useState } from 'react';

const DiasSemanaSelector = () => {
  const [diasSeleccionados, setDiasSeleccionados] = useState([]);

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

  //NOTA: "diasSeleccionados" es el array que contiene los días selecionados de

  return (
    <div>
      <label>Seleccionar Días</label>
      <div className="diasSeleccionados-crearSeccio flex flex-col w-3/4 mt-5">

        <div className='label-diasSeleccionados flex justify-between'>
          <label htmlFor='Lunes'>Lu</label>
          <label htmlFor='Martes'>Mar</label>
          <label htmlFor='Miercoles'>Mi</label>
          <label htmlFor='Jueves'>Ju</label>
          <label htmlFor='Viernes'>Vi</label>
          <label htmlFor='Sabado'>Sab</label>
        </div>

        <div className='checkbox-selecionarDias flex justify-between'>
          <input
            type="checkbox"
            name="Lunes"
            value="Lunes"
            onChange={handleDiaSeleccionado}
          />


          <input
            type="checkbox"
            name="Martes"
            value="Martes"
            onChange={handleDiaSeleccionado}
          />


          <input
            type="checkbox"
            name="Miercoles"
            value="Miercoles"
            onChange={handleDiaSeleccionado}
          />


          <input
            type="checkbox"
            name="Jueves"
            value="Jueves"
            onChange={handleDiaSeleccionado}
          />


          <input
            type="checkbox"
            name="Viernes"
            value="Viernes"
            onChange={handleDiaSeleccionado}
          />


          <input
            type="checkbox"
            name="Sabado"
            value="Sabado"
            onChange={handleDiaSeleccionado}
          />
        </div>

      </div>



    </div>
  );
};

export default DiasSemanaSelector;
