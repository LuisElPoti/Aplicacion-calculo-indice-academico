'use server'

const {PrismaClient} =  require('@prisma/client')
const prisma = new PrismaClient()

export async function CambiarContraseña(data){
    const id_usuario = data.get('id-usuario');
    const nueva_password = data.get('new-password');
    const confirmar_password = data.get('confirm-password');
    const user = await prisma.estudiantes.findFirst({ where: { matricula: id_usuario } });

    if (nueva_password !== confirmar_password) {
        console.log("Error, La contraseña no coincide")
      }

    else{
        const updatedUser = await prisma.estudiantes.update({
            where: { matricula: id_usuario },
            data: { contrase_a: nueva_password },
        });
        console.log("Contraseña modificada con exito")
    }
    
}
