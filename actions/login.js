'use server'

import { redirect } from 'next/navigation'

const {PrismaClient} =  require('@prisma/client')
const prisma = new PrismaClient()

export async function HacerLogin(data){
    const id_usuario= data.get('id-usuario')
    const password_usuario = data.get('password-usuario')
    const estudiante = await prisma.estudiantes.findFirst({
        where: {
            AND: [
                { matricula: id_usuario },
                { contrase_a: password_usuario }
              ]
        }
        
    });
        
    if(estudiante == null){
        const profesor = await prisma.profesores.findFirst({
            where: {
                AND: [
                    { matricula: id_usuario },
                    { contrase_a: password_usuario }
                  ]
            }
        });

        if(profesor == null){
            const administrador = await prisma.administradores.findFirst({
                where: {
                    AND: [
                        { matricula: id_usuario },
                        { contrase_a: password_usuario }
                      ]
                }
            });
            
            if(administrador == null){
                console.log("Usuario o contraseña no encontrados")
            }
            else{
                redirect('/Estudiante/MenuPrincipal')
            }

        }
        else{
            console.log("Bienvenido Profesor")
        }
    }
    else{
        console.log("Bienvenido Estudiante")
    }
    
}