-- CreateTable
CREATE TABLE `administradores` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(50) NULL,
    `apellido` VARCHAR(50) NULL,
    `telefono` VARCHAR(13) NULL,
    `direccion` VARCHAR(300) NULL,
    `contraseña` VARCHAR(30) NULL,
    `correo` VARCHAR(70) NULL,
    `id_tipo_documento` INTEGER NULL,
    `documento` VARCHAR(15) NULL,
    `matricula` VARCHAR(7) NULL,
    `activo` BOOLEAN NULL,

    UNIQUE INDEX `administradores_matricula_key`(`matricula`),
    INDEX `id_tipo_documento`(`id_tipo_documento`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `areas_academicas` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(50) NULL,
    `descripcion` VARCHAR(200) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `asignaturas` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `clave` VARCHAR(7) NULL,
    `creditos` INTEGER NULL,
    `nombre` VARCHAR(25) NULL,
    `id_area_academica` INTEGER NULL,
    `activo` BOOLEAN NULL,

    INDEX `id_area_academica`(`id_area_academica`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `carreras` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(50) NULL,
    `descripcion` VARCHAR(200) NULL,
    `id_area_academica` INTEGER NULL,

    INDEX `id_area_academica`(`id_area_academica`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `estados_historico` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(20) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `estados_periodo` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(20) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `estudiantes` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(50) NULL,
    `apellido` VARCHAR(50) NULL,
    `indice_general` DECIMAL(3, 2) NULL,
    `id_carrera` INTEGER NULL,
    `telefono` VARCHAR(13) NULL,
    `direccion` VARCHAR(300) NULL,
    `contraseña` VARCHAR(30) NULL,
    `correo` VARCHAR(70) NULL,
    `id_tipo_documento` INTEGER NULL,
    `documento` VARCHAR(15) NULL,
    `matricula` VARCHAR(7) NULL,
    `activo` BOOLEAN NULL,

    UNIQUE INDEX `estudiantes_matricula_key`(`matricula`),
    INDEX `id_carrera`(`id_carrera`),
    INDEX `id_tipo_documento`(`id_tipo_documento`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `historico_academico` (
    `id_historico` INTEGER NOT NULL AUTO_INCREMENT,
    `id_estudiante` INTEGER NULL,
    `id_seccion` INTEGER NULL,
    `calificacion_numerica` INTEGER NULL,
    `calificacion_literal` DECIMAL(4, 1) NULL,
    `puntos_honor` DECIMAL(6, 2) NULL,
    `id_estado_historico` INTEGER NULL,

    INDEX `id_estado_historico`(`id_estado_historico`),
    INDEX `id_estudiante`(`id_estudiante`),
    INDEX `id_seccion`(`id_seccion`),
    PRIMARY KEY (`id_historico`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `horario_secciones` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `id_seccion` INTEGER NULL,
    `dia` VARCHAR(8) NULL,
    `hora_inicio` INTEGER NULL,
    `hora_fin` INTEGER NULL,
    `aula` VARCHAR(6) NULL,

    INDEX `id_seccion`(`id_seccion`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `periodos` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `id_trimestre` INTEGER NULL,
    `id_estado_periodo` INTEGER NULL,
    `año` INTEGER NULL,

    INDEX `id_estado_periodo`(`id_estado_periodo`),
    INDEX `id_trimestre`(`id_trimestre`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `profesores` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(50) NULL,
    `apellido` VARCHAR(50) NULL,
    `id_area_academica` INTEGER NULL,
    `telefono` VARCHAR(13) NULL,
    `direccion` VARCHAR(300) NULL,
    `contraseña` VARCHAR(30) NULL,
    `correo` VARCHAR(70) NULL,
    `id_tipo_documento` INTEGER NULL,
    `documento` VARCHAR(15) NULL,
    `matricula` VARCHAR(7) NULL,
    `activo` BOOLEAN NULL,

    UNIQUE INDEX `profesores_matricula_key`(`matricula`),
    INDEX `id_area_academica`(`id_area_academica`),
    INDEX `id_tipo_documento`(`id_tipo_documento`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `secciones` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `numero` INTEGER NULL,
    `capacidad` INTEGER NULL,
    `id_asignatura` INTEGER NULL,
    `id_profesor` INTEGER NULL,
    `cupo` INTEGER NULL,
    `id_periodo` INTEGER NULL,

    INDEX `id_asignatura`(`id_asignatura`),
    INDEX `id_periodo`(`id_periodo`),
    INDEX `id_profesor`(`id_profesor`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tipo_documento` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(50) NULL,
    `descripcion` VARCHAR(200) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `trimestres` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `mes_inicio` VARCHAR(10) NULL,
    `mes_fin` VARCHAR(10) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `administradores` ADD CONSTRAINT `administradores_ibfk_1` FOREIGN KEY (`id_tipo_documento`) REFERENCES `tipo_documento`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `asignaturas` ADD CONSTRAINT `asignaturas_ibfk_1` FOREIGN KEY (`id_area_academica`) REFERENCES `areas_academicas`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `carreras` ADD CONSTRAINT `carreras_ibfk_1` FOREIGN KEY (`id_area_academica`) REFERENCES `areas_academicas`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `estudiantes` ADD CONSTRAINT `estudiantes_ibfk_1` FOREIGN KEY (`id_carrera`) REFERENCES `carreras`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `estudiantes` ADD CONSTRAINT `estudiantes_ibfk_2` FOREIGN KEY (`id_tipo_documento`) REFERENCES `tipo_documento`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `historico_academico` ADD CONSTRAINT `historico_academico_ibfk_1` FOREIGN KEY (`id_estudiante`) REFERENCES `estudiantes`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `historico_academico` ADD CONSTRAINT `historico_academico_ibfk_2` FOREIGN KEY (`id_seccion`) REFERENCES `secciones`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `historico_academico` ADD CONSTRAINT `historico_academico_ibfk_3` FOREIGN KEY (`id_estado_historico`) REFERENCES `estados_historico`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `horario_secciones` ADD CONSTRAINT `horario_secciones_ibfk_1` FOREIGN KEY (`id_seccion`) REFERENCES `secciones`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `periodos` ADD CONSTRAINT `periodos_ibfk_1` FOREIGN KEY (`id_trimestre`) REFERENCES `trimestres`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `periodos` ADD CONSTRAINT `periodos_ibfk_2` FOREIGN KEY (`id_estado_periodo`) REFERENCES `estados_periodo`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `profesores` ADD CONSTRAINT `profesores_ibfk_1` FOREIGN KEY (`id_area_academica`) REFERENCES `areas_academicas`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `profesores` ADD CONSTRAINT `profesores_ibfk_2` FOREIGN KEY (`id_tipo_documento`) REFERENCES `tipo_documento`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `secciones` ADD CONSTRAINT `secciones_ibfk_1` FOREIGN KEY (`id_asignatura`) REFERENCES `asignaturas`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `secciones` ADD CONSTRAINT `secciones_ibfk_2` FOREIGN KEY (`id_profesor`) REFERENCES `profesores`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `secciones` ADD CONSTRAINT `secciones_ibfk_3` FOREIGN KEY (`id_periodo`) REFERENCES `periodos`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
