'use server'

const {PrismaClient} =  require('@prisma/client')
const prisma = new PrismaClient()

export async function CambiarContraseña(data){
    const id_usuario = data.get('id-usuario');
    const nueva_password = data.get('new-password');
    const confirmar_password = data.get('confirm-password');
    let tipoUsuario = null;

    const estudiante = await prisma.estudiantes.findFirst({ where: { matricula: id_usuario } });
    const profesor = await prisma.profesores.findFirst({ where: { matricula: id_usuario } });
    const administrador = await prisma.administradores.findFirst({ where: { matricula: id_usuario } });

    if (estudiante) {
        tipoUsuario = 'estudiante';
    } else if (profesor) {
        tipoUsuario = 'profesor';
    } else if (administrador) {
        tipoUsuario = 'administrador';
    } else {
        console.log("Usuario o contraseña no encontrados");
    }

    if (tipoUsuario) {
        if (nueva_password !== confirmar_password) {
            console.log("Error, La contraseña no coincide");
        } else {
            switch (tipoUsuario) {
                case 'estudiante':
                    await prisma.estudiantes.update({
                        where: { matricula: id_usuario },
                        data: { contrase_a: nueva_password },
                    });
                    break;
                case 'profesor':
                    await prisma.profesores.update({
                        where: { matricula: id_usuario },
                        data: { contrase_a: nueva_password },
                    });
                    break;
                case 'administrador':
                    await prisma.administradores.update({
                        where: { matricula: id_usuario },
                        data: { contrase_a: nueva_password },
                    });
                    break;
            }
            console.log("Contraseña modificada con éxito");
        }
    }
}

