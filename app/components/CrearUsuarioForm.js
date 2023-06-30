import React from 'react'

 function CrearUsuarioForm() {
  return (
    <div className='crear-usuario-form'width={900} height={600} >
      <div className='nombre pl-5 l-20'>
      <p className='nombre-header pt-20'>Nombre</p>
          <input className='nombre-textbox p-5' type='text'name=""/>
      </div>
      <div className='nombre pl-5 l-20'>
      <p className='nombre-header pt-20'>Nombre</p>
          <input className='nombre-textbox p-5' type='text' name=""/>
      </div>


      <div className='Apellidos pl-5 l-20'>
      <p className='apellidos-header pt-20'>Apellidos</p>
          <input className='apellidos-textbox p-5' type='text'name=""/>
      </div>
    </div>
  )
}
export default CrearUsuarioForm