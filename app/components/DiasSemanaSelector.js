import { useState } from 'react';

const DiasSemanaSelector = ({onChange}) => {

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
            onChange={onChange}
          />


          <input
            type="checkbox"
            name="Martes"
            value="Martes"
            onChange={onChange}
          />


          <input
            type="checkbox"
            name="Miercoles"
            value="Miercoles"
            onChange={onChange}
          />


          <input
            type="checkbox"
            name="Jueves"
            value="Jueves"
            onChange={onChange}
          />


          <input
            type="checkbox"
            name="Viernes"
            value="Viernes"
            onChange={onChange}
          />


          <input
            type="checkbox"
            name="Sabado"
            value="Sabado"
            onChange={onChange}
          />
        </div>

      </div>



    </div>
  );
};

export default DiasSemanaSelector;
