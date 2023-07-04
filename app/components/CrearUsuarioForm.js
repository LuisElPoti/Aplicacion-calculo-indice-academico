'use client'
import React, { useEffect, useState } from 'react';

import BotonGuardar from './BotonGuardar';

function CrearUsuarioForm({width, height}) {
  const [tipoUsuario, setTipoUsuario] = useState('');
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [carrera, setCarrera] = useState('');
  const [areaAcademica, setAreaAcademica] = useState('');
  const [telefono, setTelefono] = useState('');
  const [direccion, setDireccion] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [tipoDocumento, setTipoDocumento] = useState('');
  const [documento, setDocumento] = useState('');
  const [activo, setActivo] = useState(false);
  const [carreras, setCarreras] = useState([]);
  const [areasAcademicas, setAreasAcademicas] = useState([]);
  const [formularioEnviado, setFormularioEnviado] = useState(false);


  useEffect(() => {
    const fetchData = () => {
      fetch('http://localhost:3000/api/Usuarios/CrearUsuario', {
        method: 'GET',
      })
        .then((response) => {
          if (response.ok) {
            return response.json();
          } else {
            throw new Error('Error en la respuesta:', response.status);
          }
        })
        .then((data) => {
          console.log(data);
          setCarreras(data.carreras);
          console.log(data.carreras);
          setAreasAcademicas(data.areasAcademicas);
          console.log(data.areasAcademicas);
        })
        .catch((error) => {
          console.error('Error:', error);
        });
    };
  
    fetchData();
  }, []);
  

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

    const requestData = {
      nombre,
      apellido,
      carrera: tipoUsuario === 'estudiante' ? carrera : null,
      area_academica: tipoUsuario === 'profesor' ? areaAcademica : null,
      telefono,
      dirección: direccion,
      contraseña: contrasena,
      tipo_documento: parseInt(tipoDocumento),
      documento,
      tipo_usuario: tipoUsuario,
    };

    try {
      const response = await fetch(
        'http://localhost:3000/api/Usuarios/CrearUsuario',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(requestData),
        }
      );

      if (response.status === 200) {
        alert('Usuario creado con éxito');
        document.getElementById('SubmitForm').reset();
        setFormularioEnviado(true);
        setTipoUsuario('');
        setApellido('');
        setNombre('');
        setCarrera('');
        setAreaAcademica('');
        setTelefono('');
        setDireccion('');
        setContrasena('');
        setTipoDocumento('');
        setDocumento('');
      } else {
        console.log("Problema");
        alert(
          'Hubo problemas al registrar el nuevo usuario, inténtelo de nuevo'
        );
      }
    } catch (error) {
      
      console.error('Error:', error);
      alert(
        'Hubo problemas al registrar el nuevo usuario, inténtelo de nuevo'
      );
    }
    
  };

  return (
    <form
      className="crear-usuario-form"
      id="SubmitForm"
      method="POST"
      width={1300}
      height={500}
      onSubmit={handleSubmit}
    >
      <div className="flex">
        <div className="w-1/3 px-5">
          <div className="mb-5">
            <p className="nombre-header pt-20">Tipo de usuario</p>
            <select
              className="nombre-select p-5"
              id="tipoUsuario"
              value={tipoUsuario}
              onChange={handleTipoUsuarioChange}
            >
              <option value="">Seleccionar tipo de usuario</option>
              <option value="estudiante">Estudiante</option>
              <option value="profesor">Profesor</option>
              <option value="administrador">Administrador</option>
            </select>
          </div>
          {tipoUsuario !== '' && (
            <>
              {tipoUsuario === 'estudiante' && (
                <div className="nombre">
                  <p className="nombre-header pt-20">Carrera</p>
                  <select
                    className="nombre-select p-5"
                    id="carrera"
                    name='carrera'
                    value={(carrera)}
                    onChange={handleCarreraChange}
                  >
                    <option value="">Seleccionar carrera</option>
                    {carreras.length > 0 && carreras.map((carrera) => (
                      <option key={carrera.id} value={carrera.id}>
                        {carrera.nombre}
                      </option>
                    ))}
                  </select>
                </div>
              )}
              {tipoUsuario === 'profesor' && (
                <div className="nombre pl-5 l-20">
                  <p className="nombre-header pt-20">Área Académica</p>
                  <select
                    className="nombre-select p-5"
                    id="areaAcademica"
                    name='areaAcademica'
                    value={areaAcademica}
                    onChange={handleAreaAcademicaChange}
                  >
                    <option value="">Seleccionar área académica</option>
                    {areasAcademicas.length > 0 && areasAcademicas.map((areaAcademica) => (
                      <option key={areaAcademica.id} value={areaAcademica.id}>
                        {areaAcademica.nombre}
                      </option>
                    ))}
                  </select>
                </div>
              )}
            </>
          )}
        </div>

        <div className="w-1/3 px-5">
          <div className="mb-5">
            <div className="nombre pl-5 l-20">
              <p className="nombre-header pt-20">Nombre</p>
              <input
                className="nombre-textbox p-5"
                required
                type="text"
                id="nombre"
                value={nombre}
                onChange={handleNombreChange}
              />
            </div>
            <div className="nombre pl-5 l-20">
              <p className="nombre-header pt-20">Apellido</p>
              <input
                className="nombre-textbox p-5"
                required
                type="text"
                id="apellido"
                value={apellido}
                onChange={handleApellidoChange}
              />
            </div>
            <div className="nombre pl-5 l-20">
              <p className="nombre-header pt-20">Teléfono</p>
              <input
                className="nombre-textbox p-5"
                required
                type="text"
                id="telefono"
                value={telefono}
                onChange={handleTelefonoChange}
              />
            </div>
          </div>

          <div className="nombre pl-5 l-20">
            <p className="nombre-header pt-20">Dirección</p>
            <input
              className="nombre-textbox p-5"
              required
              type="text"
              id="direccion"
              value={direccion}
              onChange={handleDireccionChange}
            />
          </div>
        </div>

        <div className="w-1/3 px-5">
          <div className="mb-5">
            <div className="nombre pl-5 l-20">
              <p className="nombre-header pt-20">Contraseña</p>
              <input
                className="nombre-textbox p-5"
                required
                type="password"
                id="contrasena"
                value={contrasena}
                onChange={handleContrasenaChange}
              />
            </div>
            <div className="nombre pl-5 l-20">
              <p className="nombre-header pt-20">Tipo de Documento</p>
              <select
                className="nombre-select p-5"
                id="tipoDocumento"
                value={tipoDocumento}
                onChange={handleTipoDocumentoChange}
              >
                <option value="">Seleccionar tipo de documento</option>
                <option value="1">Cedula</option>
                <option value="2">Pasaporte</option>
              </select>
            </div>
            <div className="nombre pl-5 l-20">
              <p className="nombre-header pt-20">Documento</p>
              <input
                className="nombre-textbox p-5"
                required
                type="text"
                id="documento"
                value={documento}
                onChange={handleDocumentoChange}
              />
            </div>
          </div>
          <div className="boton pl-15  pt-20">
            <BotonGuardar texto="Crear usuario" className="amarillo" />
          </div>

        </div>
      </div>

      <BotonGuardar />
    </form>
  );
}

export default CrearUsuarioForm;
