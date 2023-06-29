import React from 'react';
import Image from 'next/image';

export default function Tarjeta({ headerValues, className }) {
  return (
    <div className={`tarjeta flex ${className}`}>
      <Image src="/images/cuate.svg" width={150} height={300} />
      <div className='content pl-5'>
        {headerValues.map((header) => (
          <div className='tarjeta-value flex pt-2' key={header.headerName}>
            <h6 className='mr-3 font-bold tarjeta-header'>{header.headerName}:</h6>
            <p className='tarjeta-value pb-3'>{header.headerValue}</p>
          </div>
        ))}
      </div>
    </div>
  );
}