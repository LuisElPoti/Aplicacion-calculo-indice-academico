"use client"
import React, { useEffect, useState } from 'react';
import TableComponent from "@/app/components/TableFilterAsignaturas"
import { CiTrash, CiPen } from "react-icons/ci";
import axios from 'axios';

function ListadoAsignaturas() {
  const [data, setData] = useState([]);
  const headers = ['Clave', 'Asignatura', 'Creditos', 'Area', 'Eliminar', 'Editar'];

  const handleEditClick = (event, clave) => {
    // setID(id_usuario);
    // setRol(rol);
    // setShowEditContainer(!showEditContainer);
  };

  const handleDeleteClick = async (event, clave) => {
    const result = confirm(`¿Está seguro que desea inhabilitar la asignatura de clave ${clave}?`, "Esta acción no se puede deshacer");
    if (result) {
      const requestData = {
        clave: clave,
      };
      const response = await axios.post(
        "../api/EliminarAsignatura",
        requestData,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        });
      if (response.status === 200) {
        alert(`Asignatura inhabilitada con éxito`);
    } else {
        console.log("Problema");
        alert('Hubo problemas al inhabilitar la asignatura, inténtelo de nuevo');
      }
    } else {
      console.log("Cancelled.");
    }

  };

  useEffect(() => {
    const fetchData = () => {
      axios.get("../api/Asignatura")
        .then(response => {
          const newData = response.data.map(obj => {
            return {
              Clave: obj.clave,
              Asignatura: obj.nombre,
              Creditos: obj.creditos,
              Area: obj.areas_academicas.nombre,
              Opciones: <button onClick={(e) => handleDeleteClick(e, obj.clave)}><CiTrash style={{ width: "50px", height: "25px", color: '#DE5462' }} /></button>,
              Editar: <button onClick={(e) => handleEditClick(e, obj.clave)}><CiPen style={{ width: "50px", height: "25px", color: 'gray' }} /></button>
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
      <div classname="flex items-center t-30">
        <TableComponent headers={headers} data={data} />
      </div>
    </>

  );
}

export default ListadoAsignaturas;
