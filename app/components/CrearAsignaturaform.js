'use client'
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import BotonGuardar from '@/app/components/BotonGuardar'
import CrearUsuarioForm from './CrearUsuarioForm';

function CrearAsignaturaform({ buttonText = "Crear Asignatura", modo = 'crear', clave_asignatura = null, tipo = null }) {

  const [id, setID] = useState('');
  const [clave, setClave] = useState('');
  const [nombre, setNombre] = useState('');
  const [creditos, setCréditos] = useState('');
  const [areaAcademica, setAreaAcademica] = useState('');
  const [areasAcademicas, setAreasAcademicas] = useState([]);

  useEffect(() => {
    const fetchData = () => {
      axios.get("../api/AreasAcademicas")
        .then(response => {
          setAreasAcademicas(response.data);
        })
        .catch(error => {
          console.error("Error al obtener las áreas académicas:", error);
        });

      if (modo == 'editar' && clave_asignatura != null) {
        axios.get("../api/DatosAsignatura", { params: { clave: clave_asignatura } })
          .then(response => {
            setClave(clave_asignatura);
            setID(response.data[0]?.id)
            setNombre(response.data[0]?.nombre);
            setCréditos(response.data[0]?.creditos);
            setAreaAcademica(response.data[0]?.areas_academicas?.id);
          })
          .catch(error => {
            console.error("Error al obtener los datos de la asignatura", error);
          });
      }
    };

    fetchData();
  }, []);

  const handleClaveChange = (event) => {
    setClave(event.target.value);
  };

  const handleNombreChange = (event) => {
    setNombre(event.target.value);
  };

  const handleCreditosChange = (event) => {
    setCréditos(event.target.value);
  };

  const handleAreaAcademicaChange = (event) => {
    setAreaAcademica(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    

    if (modo == 'crear') {
      try {
        const requestData = {
          clave,
          creditos: parseInt(creditos),
          nombre,
          area_academica: parseInt(areaAcademica)
        };
        const response = await axios.post(
          "../api/CrearAsignatura",
          requestData,
          {
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );

        if (response.status === 200) {
          alert('Asignatura creada con éxito');
          document.getElementById('SubmitForm').reset();
          setNombre('');
          setAreaAcademica('');
          setClave('');
          setCréditos('')
          setID('');
        } else {
          console.log("Problema");
          alert('Hubo problemas al registrar la nueva asignatura, inténtelo de nuevo');
        }
      } catch (error) {
        console.error('Error:', error);
        alert('Hubo problemas al registrar la nueva asignatura, inténtelo de nuevo');
      }
    }
    else {
      try {
        const requestData = {
          clave,
          creditos: parseInt(creditos),
          nombre,
          area_academica: parseInt(areaAcademica),
          id: parseInt(id)
        };

        const response = await axios.post(
          "../api/ModificarAsignatura",
          requestData,
          {
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );

        if (response.status === 200) {
          alert('Asignatura modificada con éxito');
          document.getElementById('SubmitForm').reset();
          setNombre('');
          setAreaAcademica('');
          setClave('');
          setCréditos('')
          setID('');
        } else {
          console.log("Problema");
          alert('Hubo problemas al modificar la nueva asignatura, inténtelo de nuevo');
        }
      } catch (error) {
        console.error('Error:', error);
        alert('Hubo problemas al modificar la nueva asignatura, inténtelo de nuevo');
      }
    }
  }


  return (
    <form className='crear-usuario-form m-10' id='SubmitForm' method='POST' width={900} height={500} onSubmit={handleSubmit}>

      <div className='flex'>

        <div className='w-1/2 p-5 m-5'>

          <div className='nombre pl-5 l-20'>
            <p className='nombre-header pt-10'>Clave</p>
            <input className='nombre-textbox p-5' type='text' id="clave" value={clave} onChange={handleClaveChange} />
          </div>

          <div className='nombre pl-5 l-20'>
            <p className='nombre-header pt-20'>Nombre</p>
            <input className='nombre-textbox p-5' type='text' id="nombre" value={nombre} onChange={handleNombreChange} />
          </div>

          <div className='nombre pl-5 l-20 '>
            <p className='nombre-header pt-20'>Créditos</p>
            <input className='nombre-textbox p-5' type='text' id="creditos" value={creditos} onChange={handleCreditosChange} />
          </div>
        </div>

        <div className='w-1/2 p-5 m-5'>

          <div className='nombre pl-5'>
            <p className='nombre-header pt-10'>Area Académica</p>
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


          <div className='boton pl-6 l-10 pt-20'>
            <BotonGuardar texto={buttonText} className="amarillo" />
          </div>


        </div>

      </div>

    </form>
  );
}

export default CrearAsignaturaform;
