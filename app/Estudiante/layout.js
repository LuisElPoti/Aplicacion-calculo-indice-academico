'use client'
import MenuPrincipal from '../components/MenuPrincipal'
import Encabezado from '../components/Encabezado'
import { Inter } from 'next/font/google'
import React, { useEffect, useState } from 'react'
import Cookies from "js-cookie";


const inter = Inter({ subsets: ['latin'] })

// export const metadata = {
//     title: 'Create Next App',
//     description: 'Generated by create next app',
// }



function RootLayout({ children, title }) {

    const role = 'Estudiante';
    const menuTitle = 'Menú Principal';
    const color = 'color-profesor';

    const [userName, setUserName] = useState('');
    const [id, setID] = useState('');

    useEffect(() => {
        const resultado = Cookies.get('ID');
        setID(resultado);
        async function fetchData() {
            const newData = await getDatosSesion(resultado);
            setUserName(newData.nombre + " " + newData.apellido);
        }
        fetchData();
    }, [id]);

    return (

        <html lang="en">
            <body className={inter.className} style={{ backgroundColor: "#F3F6FF" }} >

                <div class="grid grid-cols-12 gap-0">
                    {/* <!-- Sidebar --> */}

                    <div class="col-span-2 h-max"><MenuPrincipal /></div>

                    {/* <!-- Header and container element --> */}
                    <div class="col-span-10 grid grid-rows-2 ml-12 pt-12">
                        {/* <!-- Header --> */}
                        <div class="row-span-2 pl-14 pt-5 pr-16">
                            <Encabezado
                                userName={userName}

                            />
                            <div className='ContenidoDinamico'></div>
                            {children}
                        </div>

                        {/* <!-- Container element --> */}

                    </div>
                </div>
            </body>
        </html>

    )
}


async function getDatosSesion(id_usuario) {
    const requestData = {
        id_usuario: id_usuario,
        rol: "Estudiante"
    };

    const response = await fetch('http://localhost:3000/api/DatosSesion', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
    });

    const resultado = await response.json();
    return resultado;
}
export default RootLayout;