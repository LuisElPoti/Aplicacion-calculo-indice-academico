'use client'
import MenuPrincipalAdmin from '../components/MenuPrincipalAdmin'
import Encabezado from '../components/Encabezado'
import { Inter } from 'next/font/google'
import Image from 'next/image'
import Cookies from "js-cookie";
import React, { useEffect, useState } from 'react'


const inter = Inter({ subsets: ['latin'] })

 const metadata = {
    title: 'Create Next App',
    description: 'Generated by create next app',
}

// export const metadata = {
//     title: 'Create Next App',
//     description: 'Generated by create next app',
// }


function RootLayout({ children }) {
    const [userName, setUserName] = useState('Angel Moreno');
    const [id, setID] = useState('3000001');

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

            <body className={inter.className} style={{ backgroundColor: "#FAFAFA" }} >

                <Image src="/images/AdminBackground.svg" style={{ position: "absolute", zIndex: "-1", bottom: "0", right: "0" }} width={670} height={600} />

                <div class="grid grid-cols-12">
                    {/* <!-- Sidebar --> */}
        
                    <div class="col-span-2 row-span-full h-auto"><MenuPrincipalAdmin /></div>

                    {/* <!-- Header and container element --> */}
                    <div class="col-span-10 grid grid-rows-2 ml-12 pt-12">
                        {/* <!-- Header --> */}
                        <div class="row-span-2 pl-12 pt-5">
                            <Encabezado userName={userName} />

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
        rol: "Administrador"
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
