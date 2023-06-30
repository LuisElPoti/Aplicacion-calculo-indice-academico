import MenuPrincipal from '../components/MenuPrincipalAdmin'
import EncabezadoAdmin from '../components/EncabezadoAdmin'
import { Inter } from 'next/font/google'
import Image from 'next/image'


const inter = Inter({ subsets: ['latin'] })

export const metadata = {
    title: 'Create Next App',
    description: 'Generated by create next app',
}

function RootLayout({ children }) {
    return (

        <html lang="en">

            <body className={inter.className} style={{backgroundColor:"#FAFAFA"}} >

            <Image src="/images/AdminBackground.svg" style={{position:"absolute", zIndex:"-1", bottom:"0", right:"0"}} width={670} height={600}/>

                <div class="grid grid-cols-12">
                    {/* <!-- Sidebar --> */}
        
                    <div class="col-span-2"><MenuPrincipal /></div>

                    {/* <!-- Header and container element --> */}
                    <div class="col-span-10 grid grid-rows-2 ml-12 pt-12">
                        {/* <!-- Header --> */}
                        <div class="row-span-2 pl-12 pt-5"> 
                        <EncabezadoAdmin /> 
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

export default RootLayout;
