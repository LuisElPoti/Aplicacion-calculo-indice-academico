import React from 'react'
import Chart from './Chart'

function CalcularIndiceForm() {
    return (
        <form className='calcular-indice-form m-10' width={900} height={500} >

            <div className='flex'>
                <div className='w-1/2 p-5 m-5'>
                    <div className='nombre pl-5 l-20'>
                        <p className='nombre-header pt-20'>ID</p>
                        <input className='nombre-textbox p-5' type='text' name="ID" />
                    </div>
                    <div className='nombre pl-5 l-20'>
                        <p className='nombre-header pt-20'>Nombre</p>
                        <input className='nombre-textbox p-5' type='text' name="" />
                    </div>

                    <div className='nombre pl-5 l-20 '>
                        <p className='nombre-header pt-20'>Carrera</p>
                        <input className='nombre-textbox p-5' type='text' name="" />
                    </div>

                </div>

                <div className='w-1/2 p-5 m-5'>

                    <Chart />

                </div>

            </div>

        </form >
    )
}
export default CalcularIndiceForm