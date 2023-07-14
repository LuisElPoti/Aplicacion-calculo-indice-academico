'use client'
import React, { use, useState } from 'react'
import BotonGuardar from './BotonGuardar'
import axios from 'axios';
import ProgressChart from './ProgressChart';


function CalcularIndiceForm() {
    const [nombre, setNombre] = useState('')
    const [carrera, setCarrera] = useState('')
    const [indice, setIndice] = useState(0)
    const [existe, setExiste] = useState(false)


    async function handleSubmit(event) {
        event.preventDefault();
        const requestData = {
            id_usuario: event.target.id_estudiante.value
        };
        try {
            if (existe == true) {
                const response = await axios.post(
                    "../api/CalcularIndice",
                    requestData,
                    {
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    }
                );
                if (response.status === 200) {
                    const indice_r = response?.data[0]?.f0 || 0;
                    if (indice_r == 0) {
                        alert('No se puede calcular el indice, el estudiante no tiene asignaturas aprobadas todavía');
                    }
                    else {
                        setIndice(parseFloat(indice_r));
                        alert('Indice actualizado con éxito, el indice general es: ' + indice_r);
                    }

                } else {
                    console.log("Problema");
                    alert('Hubo problemas al calcular el indice, inténtelo de nuevo');
                }
            }
            else {
                alert('El ID ingresado no existe, no se puede calcular el indice');

            }

        } catch (error) {
            console.error('Error:', error);
            alert('Hubo problemas al calcular el indice, inténtelo de nuevo');
        }
    }

    const delay = 1000;
    let timeout;

    function handleChange(e) {
        clearTimeout(timeout);
        timeout = setTimeout(() => {
            axios.post("../api/DatosSesion", { id_usuario: e.target.value, rol: "Estudiante" })
                .then(response => {
                    const data = response.data;
                    if (data) {
                        setNombre(data.nombre);
                        setCarrera(data.carreras?.nombre);
                        setIndice(parseFloat(data.indice_general));
                        setExiste(true);
                    }
                    else {
                        alert('El ID ingresado no existe');
                        setNombre('');
                        setCarrera('');
                        setExiste(false);
                        setIndice(0);
                    }

                })
                .catch(error => {
                    console.error("Error al obtener las carreras:", error);
                });
        }, delay);
    }

    return (
        <form method="POST" className='calcular-indice-form m-10' width={900} height={500} onSubmit={handleSubmit} >

            <div className='flex gap-x-10 m-5 pl-10 pr-20'>
                <div className='w-1/2 p-5 m-5'>
                    <div className='nombre pl-5 l-20'>
                        <p className='nombre-header pt-20'>ID</p>
                        <input id="id_estudiante" onChange={handleChange} className='nombre-textbox p-5' type='text' name="ID" required />
                    </div>
                    <div className='nombre pl-5 l-20'>
                        <p className='nombre-header pt-20'>Nombre</p>
                        <input className='nombre-textbox p-5' type='text' name="" readOnly value={nombre} />
                    </div>

                    <div className='nombre pl-5 l-20 '>
                        <p className='nombre-header pt-20'>Carrera</p>
                        <input className='nombre-textbox p-5' type='text' name="" readOnly value={carrera} />
                    </div>

                    <div className='m-10 pl-0 l-15'>
                        <BotonGuardar texto="Calcular Indice" className={"amarillo"} />
                    </div>

                </div>

                <div className='w-1/2 flex items-center'>

                    <ProgressChart value={indice} />

                </div>

            </div>

        </form >
    )
}
export default CalcularIndiceForm