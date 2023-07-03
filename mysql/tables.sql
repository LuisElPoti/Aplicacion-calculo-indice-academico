CREATE TABLE IF NOT EXISTS `Tipo_Documento` (
    `id` int AUTO_INCREMENT,
    `nombre` varchar(50),
    `descripcion` varchar(200),
    PRIMARY KEY (`id`)
);

CREATE TABLE IF NOT EXISTS `Trimestres` (
    `id` int AUTO_INCREMENT,
    `mes_inicio` varchar(10),
    `mes_fin` varchar(10),
    PRIMARY KEY (`id`)
);

CREATE TABLE IF NOT EXISTS `Estados_Periodo` (
    `id` int AUTO_INCREMENT,
    `nombre` varchar(20),
    PRIMARY KEY (`id`)
);

CREATE TABLE IF NOT EXISTS `Periodos` (
    `id` int AUTO_INCREMENT,
    `id_trimestre` int,
    `id_estado_periodo` int,
    `año` int,
    PRIMARY KEY (`id`),
    FOREIGN KEY (`id_trimestre`) REFERENCES `Trimestres`(`id`),
    FOREIGN KEY (`id_estado_periodo`) REFERENCES `Estados_Periodo`(`id`)
);


CREATE TABLE IF NOT EXISTS `Areas_Academicas` (
    `id` int AUTO_INCREMENT,
    `nombre` varchar(50),
    `descripcion` varchar(200),
    PRIMARY KEY (`id`)
);

CREATE TABLE IF NOT EXISTS `Asignaturas` (
    `id` int AUTO_INCREMENT,
    `clave` varchar(7),
    `creditos` int,
    `nombre` varchar(80),
    `id_area_academica` int,
    `activo` bool,
    PRIMARY KEY (`id`),
    FOREIGN KEY (`id_area_academica`) REFERENCES `Areas_Academicas`(`id`)
);

CREATE TABLE IF NOT EXISTS `Carreras` (
    `id` int AUTO_INCREMENT,
    `nombre` varchar(80),
    `descripcion` varchar(200),
    `id_area_academica` int,
    `total_creditos` int,
    `total_asignaturas` int,
    PRIMARY KEY (`id`),
    FOREIGN KEY (`id_area_academica`) REFERENCES `Areas_Academicas`(`id`)
);


CREATE TABLE IF NOT EXISTS `Estudiantes` (
    `id` int AUTO_INCREMENT,
    `nombre` varchar(50),
    `apellido` varchar(50),
    `indice_general` decimal(3,2),
    `id_carrera` int,
    `telefono` varchar(13),
    `direccion` varchar(300),
    `contraseña` varchar(30),
    `correo` varchar(70),
    `id_tipo_documento` int,
    `documento` varchar(15),
    `matricula` varchar(7) unique,
    `activo` boolean,
    `asignaturas_aprobadas` int,
    `creditos_aprobados` int,
    `indice_trimestral` int
    PRIMARY KEY (`id`),
    FOREIGN KEY (`id_carrera`) REFERENCES `Carreras`(`id`),
    FOREIGN KEY (`id_tipo_documento`) REFERENCES `Tipo_Documento`(`id`)
);

CREATE TABLE IF NOT EXISTS `Profesores` (
    `id` int AUTO_INCREMENT,
    `nombre` varchar(50),
    `apellido` varchar(50),
    `id_area_academica` int,
    `telefono` varchar(13),
    `direccion` varchar(300),
    `contraseña` varchar(30),
    `correo` varchar(70),
    `id_tipo_documento` int,
    `documento` varchar(15),
    `matricula` varchar(7) unique,
    `activo` bool,
    PRIMARY KEY (`id`),
    FOREIGN KEY (`id_area_academica`) REFERENCES `Areas_Academicas`(`id`),
    FOREIGN KEY (`id_tipo_documento`) REFERENCES `Tipo_Documento`(`id`)
);

CREATE TABLE IF NOT EXISTS `Administradores` (
    `id` int AUTO_INCREMENT,
    `nombre` varchar(50),
    `apellido` varchar(50),
    `telefono` varchar(13),
    `direccion` varchar(300),
    `contraseña` varchar(30),
    `correo` varchar(70),
    `id_tipo_documento` int,
    `documento` varchar(15),
    `matricula` varchar(7) unique,
    `activo` bool,
    PRIMARY KEY (`id`),
    FOREIGN KEY (`id_tipo_documento`) REFERENCES `Tipo_Documento`(`id`)
);

CREATE TABLE IF NOT EXISTS `Secciones` (
    `id` int AUTO_INCREMENT,
    `numero` int,
    `capacidad` int,
    `id_asignatura` int,
    `id_profesor` int,
    `cupo` int,
    `id_periodo` int,
    PRIMARY KEY (`id`),
    FOREIGN KEY (`id_asignatura`) REFERENCES `Asignaturas`(`id`),
    FOREIGN KEY (`id_profesor`) REFERENCES `Profesores`(`id`),
    FOREIGN KEY (`id_periodo`) REFERENCES `Periodos`(`id`)
);

CREATE TABLE IF NOT EXISTS `Horario_Secciones` (
    `id` int AUTO_INCREMENT,
    `id_seccion` int,
    `dia` varchar(20),
    `hora_inicio` int,
    `hora_fin` int,
    `aula` varchar(6),
    PRIMARY KEY (`id`),
    FOREIGN KEY (`id_seccion`) REFERENCES `Secciones`(`id`)
);

CREATE TABLE IF NOT EXISTS `Estados_Historico` (
    `id` int AUTO_INCREMENT,
    `nombre` varchar(20),
    PRIMARY KEY (`id`)
);

CREATE TABLE IF NOT EXISTS `Historico_Academico` (
    `id_historico` int AUTO_INCREMENT,
    `id_estudiante` int,
    `id_seccion` int,
    `calificacion_numerica` int,
    `calificacion_literal` varchar(2),
    `puntos_honor` decimal(6,2),
    `id_estado_historico` int,
    PRIMARY KEY (`id_historico`),
    FOREIGN KEY (`id_estudiante`) REFERENCES `Estudiantes`(`id`),
    FOREIGN KEY (`id_seccion`) REFERENCES `Secciones`(`id`),
    FOREIGN KEY (`id_estado_historico`) REFERENCES `Estados_Historico`(`id`)
);