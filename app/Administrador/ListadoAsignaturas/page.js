"use client"
import React, { useEffect, useState } from 'react';
import TableComponent from "@/app/components/TableFilterAsignaturas"
import { CiTrash, CiPen } from "react-icons/ci";
import axios from 'axios';

function ListadoAsignaturas() {
  const [data, setData] = useState([]);
  const headers = ['Clave', 'Asignatura', 'Creditos', 'Area'];

  const handleEditClick = (event, id_usuario, rol) => {
    // setID(id_usuario);
    // setRol(rol);
    // setShowEditContainer(!showEditContainer);
  };

  const handleDeleteClick = async (event, id_usuario, rol) => {
    // setID(id_usuario);
    // setRol(rol);
    // const result = confirm(`¿Está seguro que desea inhabilitar al usuario ${id_usuario}?`, "Esta acción no se puede deshacer");
    // if (result) {
    //   const requestData = {
    //     id_usuario: id_usuario,
    //     tipo_usuario: rol.toLowerCase(),
    //   };
    //   const response = await axios.post(
    //     "../api/Usuarios/EliminarUsuario",
    //     requestData,
    //     {
    //       headers: {
    //         'Content-Type': 'application/json',
    //       },
    //     });
    //   if (response.status === 200) {
    //     alert(`Usuario inhabilitado con éxito`);

    //   } else {
    //     console.log("Problema");
    //     alert('Hubo problemas al inhabilitar el nuevo usuario, inténtelo de nuevo');
    //   }
    // } else {
    //   console.log("Cancelled.");
    // }

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
              Opciones: <button onClick={(e) => handleDeleteClick(e, obj.Id, obj.Tipo)}><CiTrash style={{ width: "50px", height: "25px", color: '#DE5462' }} /></button>,
              Editar: <button onClick={(e) => handleEditClick(e, obj.Id, obj.Tipo)}><CiPen style={{ width: "50px", height: "25px", color: 'gray' }} /></button>
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
