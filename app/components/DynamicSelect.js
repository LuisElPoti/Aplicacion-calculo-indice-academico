import React, { useState } from 'react';

const DynamicSelect = ({ options, label, value, onChange, selectClassName }) => {
  return (
    <div className='flex flex-col'>
      <label>{label}</label>
      <select value={value} onChange={onChange} className={selectClassName}>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default DynamicSelect;
