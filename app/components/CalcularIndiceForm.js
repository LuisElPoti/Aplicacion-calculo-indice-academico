'use client'
import React, { use, useState } from 'react'
import Chart from './Chart'
import BotonGuardar from './BotonGuardar'
import axios from 'axios';


function CalcularIndiceForm() {
    const [nombre, setNombre] = useState('')
    const [carrera, setCarrera] = useState('')

    async function handleSubmit(event) {
        event.preventDefault();
        const requestData = {
            id_usuario: event.target.id_estudiante.value
        };
        try {
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
                alert('Indice actualizado con éxito, el indice general es: ' + response.data[0].f0);
            } else {
                console.log("Problema");
                alert('Hubo problemas al calcular el indice, inténtelo de nuevo');
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
                    }
                    else {
                        setNombre('');
                        setCarrera('');
                    }

                })
                .catch(error => {
                    console.error("Error al obtener las carreras:", error);
                });
        }, delay);
    }

    return (
        <form method="POST" className='calcular-indice-form m-10' width={900} height={500} onSubmit={handleSubmit} >

            <div className='flex'>
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

                </div>

                <div className='w-1/2 p-5 m-5'>

                    <Chart />
                    <div className='p-10 m-10'>
                        <BotonGuardar texto="Calcular Indice" className={"amarillo"} />
                    </div>

                </div>

            </div>

        </form >
    )
}
export default CalcularIndiceForm