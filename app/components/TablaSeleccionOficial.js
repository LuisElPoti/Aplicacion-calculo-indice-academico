'use client'
'use client'
import { useState } from "react";
import Image from "next/image";

export default function TablaSeleccionOficial({ headers, data }) {
    const [showSubData, setShowSubData] = useState({});
    const [selectedSubData, setSelectedSubData] = useState({});

    const handleDropdown = (id) => {
        setShowSubData(prevState => ({ ...prevState, [id]: !prevState[id] }));
    }

    const handleSubDataSelection = (parentId, subData) => {
        setSelectedSubData(prevState => ({ ...prevState, [parentId]: subData }));
    }

    return (
        <table className="tabla-seleccion-oficial w-full text-left table-auto border-collapse border-none">
            <thead>
                <tr>
                    {headers.map((header, index) =>
                        <th key={index} className="px-4 py-2">{header}</th>
                    )}
                </tr>
            </thead>
            <tbody>
                {data.map((row) => {
                    const selected = selectedSubData[row.id] || {};
                    return (
                        <>
                            <tr key={row.id} className={`${showSubData[row.id] ? "bg-F3F6FF" : "bg-white"}`}>
                                <td className="border-none px-4 py-2">
                                    <button onClick={() => handleDropdown(row.id)}>
                                        <Image
                                            src="/icons/ArrowDown.svg"
                                            width={10}
                                            height={10}
                                            alt="Arrown Down"
                                        />
                                    </button>
                                </td>
                                {Object.entries(row)
                                    .filter(([key]) => key !== "id" && key !== "seccionesDisponibles")
                                    .map(([key, value], i) =>
                                        <td key={i} className="border-none px-4 py-2">{selected[key] || value}</td>
                                    )
                                }
                                <td className="border-none px-4 py-2">
                                    <button>
                                        <Image
                                            src="/icons/IconX.svg"
                                            width={10}
                                            height={10}
                                            alt="Delete"
                                        />
                                    </button>
                                </td>
                            </tr>
                            {showSubData[row.id] && row.seccionesDisponibles &&
                                <tr>
                                    <td colSpan={headers.length} className="px-4 py-2">
                                        <table className="w-full text-left table-auto border-collapse border-none">
                                            <tbody>
                                                {row.seccionesDisponibles.map((secciones, index) =>
                                                    <tr key={index} className="bg-white">
                                                        <td className="border-none px-4 py-2">
                                                            <input
                                                                type='radio'
                                                                name={`${row.id}-subData`}
                                                                value={secciones.id}
                                                                onChange={() => handleSubDataSelection(row.id, secciones)}
                                                                checked={selectedSubData[row.id] && selectedSubData[row.id].id === secciones.id}
                                                            />
                                                        </td>
                                                        {Object.entries(secciones)
                                                            .filter(([key]) => key !== "id")
                                                            .map(([key, value], i) =>
                                                                <td key={i} className="border-none px-4 py-2">{value}</td>
                                                            )
                                                        }
                                                    </tr>
                                                )}

                                            </tbody>
                                        </table>
                                    </td>
                                </tr>
                            }
                        </>
                    )
                })}
            </tbody>
        </table>
    );
}
