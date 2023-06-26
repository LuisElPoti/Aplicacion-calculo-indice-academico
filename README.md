# Aplicacion de Cálculo de Índice Académico

## Integrantes del equipo

1. Pazzis Paulino
2. Paola Saldaña
3. Luis Adames
4. Allen Silverio

## Descripción del proyecto

La Aplicación para Cálculo de Índice Académico consiste en un software diseñado para el cálculo del índice académico dentro de una institución educativa. En ese sentido, brindará mecanismos a los maestros para llevar control de las asignaturas que imparte y a los estudiantes información sobre su condición académica, tanto por trimestre como de manera general, en base a las asignaturas que previamente seleccionó.

## Puertos

- 15000: Puerto de la aplicación NextJS
- 18000: Puerto de la base de datos MySQL

## Requerimientos

1. Tener instalado Docker Desktop en el equipo.

2. Tener instalado NodeJS y npm en el equipo.

## Correr la aplicacion

1. Ejecutar el comando `docker-compose up` para levantar el contenedor de la base de datos y la aplicación

2. Dirigirse al navegador y entrar a la dirección `localhost:15000`

## Trabajar con la base de datos

1. Ejecutar el comando `docker-compose up db` para levantar el contenedor de la base de datos

2. Ejecutar el comando `npx prisma db pull` para actualizar el esquema de la base de datos

3. Ejecutar el comando `npx prisma generate` para generar los modelos de la base de datos
