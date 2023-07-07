"use client"
import TableComponent from "@/app/components/TableComponentFilter"
import TablaBasica from "@/app/components/TablaBasica"
import CrearUsuarioForm from "@/app/components/CrearUsuarioForm";
import { CiTrash, CiPen } from "react-icons/ci";
import React, { useEffect, useState } from 'react';
import axios from 'axios';


export default function ListadoUsuarios() {

  // Renderizado condicional para hacer que aparezca el contenedor de editar

  const [showEditContainer, setShowEditContainer] = useState(false);

  const handleEditClick = (event, id_usuario, rol) => {
    setID(id_usuario);
    setRol(rol);
    setShowEditContainer(!showEditContainer);
  };

  const handleDeleteClick = async (event, id_usuario, rol) => {
    setID(id_usuario);
    setRol(rol);
    const result = confirm(`¿Está seguro que desea inhabilitar al usuario ${id_usuario}?`, "Esta acción no se puede deshacer");
    if (result) {
      const requestData = {
        id_usuario: id_usuario,
        tipo_usuario: rol.toLowerCase(),
      };
      const response = await axios.post(
        "../api/Usuarios/EliminarUsuario",
        requestData,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        });
      if (response.status === 200) {
        alert(`Usuario inhabilitado con éxito`);

      } else {
        console.log("Problema");
        alert('Hubo problemas al inhabilitar el nuevo usuario, inténtelo de nuevo');
      }
    } else {
      console.log("Cancelled.");
    }


  };

  const [id_usuario, setID] = useState(null);
  const [rol, setRol] = useState(null);

  const [data, setData] = useState([]);

  // Headers de la tabla
  const headers = ['Tipo', 'Id', 'Nombre', 'Documento', 'Carrera', 'Area', 'Eliminar', 'Editar'];
  useEffect(() => {
    const fetchData = () => {
      axios.get("../api/ListadoUsuarios")
        .then(response => {
          const newData = response.data.map(obj => {
            return {
              ...obj,
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

      <TableComponent headers={headers} data={data} modo="editar" id_usuario={id_usuario} />
      <div className="mt-5">
        {showEditContainer && <CrearUsuarioForm buttonText={'Actualizar Datos'} modo='editar' id_usuario={id_usuario} tipo={rol} />}
      </div>

    </>


  )
}
