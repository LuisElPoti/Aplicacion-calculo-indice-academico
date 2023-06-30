import React from 'react';
import Image from 'next/image';

export default function Tarjeta({ headerValues, className, imageSource }) {
  return (
    <div className={`tarjeta flex pl-7 ${className} pb-3`}>
      <Image src={imageSource} className='mt-2' width={100} height={275} />
      <div className='content ml-8'>
        {headerValues.map((header) => (
          <div className='tarjeta-value flex mt-3' key={header.headerName}>
            <h6 className='mr-3 font-bold tarjeta-header'>{header.headerName}:</h6>
            <p className='tarjeta-value'>{header.headerValue}</p>
          </div>
        ))}
      </div>
    </div>
  );
}