'use client'
import React, { useState } from 'react';
import { PrismaClient } from '@prisma/client';
import BotonGuardar from './BotonGuardar';



function CrearUsuarioForm() {
  const [tipoUsuario, setTipoUsuario] = useState('');
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [carrera, setCarrera] = useState('');
  const [indiceGeneral, setIndiceGeneral] = useState('');
  const [areaAcademica, setAreaAcademica] = useState('');
  const [telefono, setTelefono] = useState('');
  const [direccion, setDireccion] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [tipoDocumento, setTipoDocumento] = useState('');
  const [documento, setDocumento] = useState('');
  const [activo, setActivo] = useState(false);

  const handleTipoUsuarioChange = (event) => {
    setTipoUsuario(event.target.value);
  };

  const handleNombreChange = (event) => {
    setNombre(event.target.value);
  };

  const handleApellidoChange = (event) => {
    setApellido(event.target.value);
  };

  const handleCarreraChange = (event) => {
    setCarrera(event.target.value);
  };

  const handleIndiceGeneralChange = (event) => {
    setIndiceGeneral(event.target.value);
  };

  const handleAreaAcademicaChange = (event) => {
    setAreaAcademica(event.target.value);
  };

  const handleTelefonoChange = (event) => {
    setTelefono(event.target.value);
  };

  const handleDireccionChange = (event) => {
    setDireccion(event.target.value);
  };

  const handleContrasenaChange = (event) => {
    setContrasena(event.target.value);
  };

  const handleTipoDocumentoChange = (event) => {
    setTipoDocumento(event.target.value);
  };

  const handleDocumentoChange = (event) => {
    setDocumento(event.target.value);
  };

  const handleActivoChange = (event) => {
    setActivo(event.target.checked);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      let nuevoUsuario;
      const prisma = new PrismaClient();
      if (tipoUsuario === 'estudiante') {
        nuevoUsuario = await prisma.estudiante.create({
          data: {
            nombre,
            apellido,
            indice_general: indiceGeneral,
            carrera,
            telefono,
            direccion,
            contraseña: contrasena,
            tipo_documento: tipoDocumento,
            documento,
            activo,
          },
        });
      } else if (tipoUsuario === 'profesor') {
        nuevoUsuario = await prisma.profesor.create({
          data: {
            nombre,
            apellido,
            area_academica: areaAcademica,
            telefono,
            direccion,
            contraseña: contrasena,
            tipo_documento: tipoDocumento,
            documento,
            activo,
          },
        });
      } else if (tipoUsuario === 'administrador') {
        nuevoUsuario = await prisma.administrador.create({
          data: {
            nombre,
            apellido,
            telefono,
            direccion,
            contraseña: contrasena,
            tipo_documento: tipoDocumento,
            documento,
            activo,
          },
        });
      }

      console.log('Usuario creado:', nuevoUsuario);
    } catch (error) {
      console.error('Error al crear el usuario:', error);
    }
  };

  return (
    <form className="crear-usuario-form m-10" width={900} height={500} onSubmit={handleSubmit}>
      <div className="flex">
        <div className="w-1/2 p-5 m-5">
          <div className="nombre pl-5 l-20">
            <p className="nombre-header pt-20">Tipo de usuario</p>
            <select
              className="nombre-select p-5"
              value={tipoUsuario}
              onChange={handleTipoUsuarioChange}
            >
              <option value="">Seleccionar tipo de usuario</option>
              <option value="estudiante">Estudiante</option>
              <option value="profesor">Profesor</option>
              <option value="administrador">Administrador</option>
            </select>
          </div>
          {tipoUsuario === 'estudiante' && (
            <>
              <div className="nombre pl-5 l-20">
                <p className="nombre-header pt-20">Carrera</p>
                <select
                  className="nombre-select p-5"
                  value={carrera}
                  onChange={handleCarreraChange}
                >
                  <option value="">Seleccionar carrera</option>
                  {/* Opciones de carreras */}
                </select>
              </div>
              <div className="nombre pl-5 l-20">
                <p className="nombre-header pt-20">Índice General</p>
                <input
                  className="nombre-textbox p-5"
                  type="text"
                  value={indiceGeneral}
                  onChange={handleIndiceGeneralChange}
                />
              </div>
            </>
          )}
          {tipoUsuario === 'profesor' && (
            <div className="nombre pl-5 l-20">
              <p className="nombre-header pt-20">Área Académica</p>
              <select
                className="nombre-select p-5"
                value={areaAcademica}
                onChange={handleAreaAcademicaChange}
              >
                <option value="">Seleccionar área académica</option>
                {/* Opciones de áreas académicas */}
              </select>
            </div>
          )}
        </div>

        <div className="w-1/2 p-5 m-5">
          <div className="nombre pl-5 l-20">
            <p className="nombre-header pt-20">Nombre</p>
            <input
              className="nombre-textbox p-5"
              type="text"
              value={nombre}
              onChange={handleNombreChange}
            />
          </div>
          <div className="nombre pl-5 l-20">
            <p className="nombre-header pt-20">Apellido</p>
            <input
              className="nombre-textbox p-5"
              type="text"
              value={apellido}
              onChange={handleApellidoChange}
            />
          </div>
          <div className="nombre pl-5 l-20">
            <p className="nombre-header pt-20">Teléfono</p>
            <input
              className="nombre-textbox p-5"
              type="text"
              value={telefono}
              onChange={handleTelefonoChange}
            />
          </div>
          <div className="nombre pl-5 l-20">
            <p className="nombre-header pt-20">Dirección</p>
            <input
              className="nombre-textbox p-5"
              type="text"
              value={direccion}
              onChange={handleDireccionChange}
            />
          </div>
          <div className="nombre pl-5 l-20">
            <p className="nombre-header pt-20">Contraseña</p>
            <input
              className="nombre-textbox p-5"
              type="password"
              value={contrasena}
              onChange={handleContrasenaChange}
            />
          </div>
          <div className="nombre pl-5 l-20">
            <p className="nombre-header pt-20">Tipo de documento</p>
            <select
              className="nombre-select p-5"
              value={tipoDocumento}
              onChange={handleTipoDocumentoChange}
            >
              <option value="">Seleccionar tipo de documento</option>
              {/* Opciones de tipos de documento */}
            </select>
          </div>
          <div className="nombre pl-5 l-20">
            <p className="nombre-header pt-20">Documento</p>
            <input
              className="nombre-textbox p-5"
              type="text"
              value={documento}
              onChange={handleDocumentoChange}
            />
          </div>
          <div className="nombre pl-5 l-20">
            <p className="nombre-header pt-20">Activo</p>
            <input
              className="nombre-checkbox"
              type="checkbox"
              checked={activo}
              onChange={handleActivoChange}
            />
          </div>
          <div className="boton pl-15 l-10 pt-20">
            <BotonGuardar texto="Crear usuario" className="amarillo" />
          </div>
        </div>
      </div>
    </form>
  );
}

export default CrearUsuarioForm;