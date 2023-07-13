"use client"
import TableComponent from "@/app/components/TableComponentSecciones"
import { CiTrash } from "react-icons/ci";
import React, { useEffect, useState } from 'react';
import axios from 'axios';


export default function ListadoSecciones() {

  const [id_seccion, setID] = useState(null);
  const [data, setData] = useState([]);

  const handleDeleteClick = async (event, id_seccion, rol) => {
    setID(id_seccion);
    const result = confirm(`¿Está seguro que desea inhabilitar la seccion ${id_seccion}?`, "Esta acción no se puede deshacer");
    if (result) {
      const requestData = {
        id_seccion: id_seccion
      };
      const response = await axios.post(
        "../api/EliminarSeccion",
        requestData,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        });
      if (response.status === 200) {
        alert(`Seccion inhabilitada con éxito`);

      } else {
        console.log("Problema");
        alert('Hubo problemas al inhabilitar el la seccion, inténtelo de nuevo');
      }
    } else {
      console.log("Cancelled.");
    }
  };

  // Headers de la tabla
  const headers = ['Numero', 'Clave', 'Asignatura', 'Area', 'Profesor', 'Eliminar'];
  useEffect(() => {
    const fetchData = () => {
      axios.get("../api/ListadoSecciones")
        .then(response => {
          const newData = response.data.map(obj => {
            return {
              Numero: obj.numero,
              Clave: obj.asignaturas.clave,
              Asignatura: obj.asignaturas.nombre,
              Area: obj.asignaturas.areas_academicas.nombre,
              Profesor: obj.profesores.nombre + " " + obj.profesores.apellido,
              Opciones: <button onClick={(e) => handleDeleteClick(e, obj.id)}><CiTrash style={{ width: "50px", height: "25px", color: '#DE5462' }} /></button>,
            };
          });
          setData(newData);

        })
        .catch(error => {
          console.error("Error al obtener a los usuarios:", error);
        });
    };
    fetchData();
  }, []);

  return (
    <>
      <TableComponent headers={headers} data={data} />
    </>
  )
}
