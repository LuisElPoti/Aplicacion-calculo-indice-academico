import React from 'react';
import Image from 'next/image';

export default function Tarjeta({ headerValues, className }) {
  return (
    <div className={`tarjeta flex pl-7 ${className}`}>
      <Image src="/images/cuate.svg" width={130} height={275} />
      <div className='content pl-5 mt-2'>
        {headerValues.map((header) => (
          <div className='tarjeta-value flex pt-1' key={header.headerName}>
            <h6 className='mr-3 font-bold tarjeta-header'>{header.headerName}:</h6>
            <p className='tarjeta-value pb-2'>{header.headerValue}</p>
          </div>
        ))}
      </div>
    </div>
  );
}