import React from 'react'
import BotonGuardar from './BotonGuardar'

function CrearUsuarioForm() {
  return (
    <form className='crear-usuario-form m-10' width={900} height={500} >

      <div className='flex'>
        <div className='w-1/2 p-5 m-5'>
          <div className='nombre pl-5 l-20'>
            <p className='nombre-header pt-20'>Tipo de usuario</p>
            <input className='nombre-textbox p-5' type='text' name="" />
          </div>
          <div className='nombre pl-5 l-20'>
            <p className='nombre-header pt-20'>Tipo documento</p>
            <input className='nombre-textbox p-5' type='text' name="" />
          </div>

          <div className='nombre pl-5 l-20 '>
            <p className='nombre-header pt-20'>Carrera</p>
            <input className='nombre-textbox p-5' type='text' name="" />
          </div>

        </div>

        <div className='w-1/2 p-5 m-5'>

          <div className='nombre pl-5 l-20'>
            <p className='nombre-header pt-20'>Nombre</p>
            <input className='nombre-textbox p-5' type='text' name="" />
          </div>

          <div className='nombre pl-5 l-20'>
            <p className='nombre-header pt-20'>Apellidos</p>
            <input className='nombre-textbox p-5' type='text' name="" />
          </div>

          <div className='nombre pl-5 l-20'>
            <p className='nombre-header pt-20'>Documento</p>
            <input className='nombre-textbox p-5' type='text' name="" />
          </div>
          <div className='boton pl-15 l-10 pt-20'>
            <BotonGuardar texto="Crear usuario" className="amarillo" />
          </div>


        </div>

      </div>

    </form >
  )
}
export default CrearUsuarioForm