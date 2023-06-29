INSERT INTO Tipo_Documento (nombre, descripcion)
VALUES 
('Cédula', 'Documento de Identidad Dominicano'),
('Pasaporte', 'Extranjero');

INSERT INTO Areas_Academicas (nombre, descripcion) 
VALUES 
('Ingeniería', 'IN'),
('Economía y Negocios', 'NG'),
('Ciencias Básicas y ambientales', 'CB'),
('Ciencias Sociales y Humanidades', 'SH'),
('Ciencias de la Salud', 'SA')
;

INSERT INTO Trimestres (mes_inicio, mes_fin) 
VALUES 
('Febrero', 'Abril'),
('Mayo', 'Julio'),
('Agosto', 'Octubre'),
('Noviembre', 'Enero')
;

INSERT INTO Estados_Periodo (nombre) 
VALUES 
('No iniciado'),
('En curso'),
('Finalizado');


INSERT INTO Periodos (id_trimestre, id_estado_periodo, año) 
VALUES 
(1,3,2023),
(2,2,2023),
(3,1,2023),
(4,1,2023);

INSERT INTO `Asignaturas` (`clave`, `creditos`, `nombre`, `id_area_academica`, `activo`) 
VALUES 
('CBM305', 4, 'MATEMATICA DISCRETA I', 3, true),
('IDS329', 4, 'INGENIERIA DE FACTORES HUMANOS', 1, true),
('IDS329L', 1, 'LABORATORIO INGENIERIA DE FACTORES HUMANOS', 1, true),
('IDS345', 3, 'DESARROLLO DE SOFTWARE III', 1, true),
('IDS345L', 1, 'LABORATORIO DE DESARROLLO DE SOFTWARE III', 1, true),
('IDS346', 3, 'MODELOS Y METODOS DE LA INGENIERIA DE SOFTWARE', 1, true),
('INS380', 4, 'BASES DE DATOS II', 1, true),
('INS380L', 1, 'LABORATORIO DE BASES DE DATOS II', 1, true),
('ICS202', 4, 'ALGORITMOS MALICIOSOS', 1, true),
('ICS202L', 1, 'LABORATORIO DE ALGORITMOS MALICIOSOS', 1, true),
('IDS325', 4, 'ASEGURAMIENTO DE LA CALIDAD DEL SOFTWARE', 1, true),
('IDS325L', 1, 'LABORATORIO ASEGURAMIENTO DE LA CALIDAD DEL SOFTWARE', 1, true),
('IDS335', 4, 'DISEÑO DE SOFTWARE', 1, true),
('IDS347', 3, 'TENDENCIAS EN DESARROLLO DE SOFTWARE', 1, true),
('IDS347L', 1, 'LABORATORIO TENDENCIAS EN DESARROLLO DE SOFTWARE', 1, true),
('ING214', 4, 'ANALISIS DE DATOS EN INGENIERIA', 1, true),
('CON213', 2, 'FUNDAMENTOS DE CONTABILIDAD', 2, true),
('IDS303', 2, 'PRACTICA PROFESIONAL DE INGENIERIA DE SOFTWARE', 1, true),
('IDS309', 4, 'ARQUITECTURA DE SOFTWARE', 1, true),
('IDS348', 3, 'DESARROLLO DE APLICACIONES WEB', 1, true),
('IDS348L', 1, 'LABORATORIO DESARROLLO DE APLICACIONES WEB', 1, true),
('ING230', 4, 'INGENIERIA ECONOMICA', 1, true),
('ING231', 3, 'EXPERIMENTACION EN INGENIERIA', 1, true);


INSERT INTO Carreras (nombre,descripcion,id_area_academica)
VALUES 
('Ingenieria de Software', 'IDS',1),
('Ingenieria en Ciberseguridad', 'ICS',1),
('Ingenieria Civil', 'CIV',1),
('Ingenieria Mecánica', 'IM',1),
('Ingenieria Mecatrónica', 'IMC',1),
('Licenciatura en matemática orientada a la Educación Secundaria', 'LME',3),
('Ingenieria Industrial', 'INI',1),
('Medicina', 'MED',5),
('Licenciatura en Psicología', 'PSI',4),
('Licenciatura en Cine y Comunicación Audiovisual', 'LCC',4),
('Economía', 'ECO',2),
('Negocios Internacionales', 'LNI',2),
('Ingenieria Biomédica', 'IBI',1)
;

INSERT INTO Administradores(nombre, apellido, telefono, direccion, contraseña, correo, id_tipo_documento, documento, matricula, activo)
VALUES ('Gustavo', 'Mejia', '0000000000', 'Calle Gustavo Mejia Ricart', 'Pepito1234', 'Gustavo.Mejia@institucion.edu.do', 1, '123456789', '3000001',  true)

INSERT INTO Estudiantes(nombre, apellido, indice_general, id_carrera, telefono, direccion, contraseña, correo, id_tipo_documento, documento, matricula, activo)
VALUES 
    ('Juan', 'Pérez', 0.0, 1, '8094567890', 'Calle Principal 123', 'secreta123', '1101001@institucion.edu.do', 2, '40112345672', '1101001', true),
    ('María', 'González', 0.0, 2, '8096543210', 'Avenida Central 456', 'password456', '1101002@institucion.edu.do', 1, '40119876432', '1101002', true),
    ('Carlos', 'López', 0.0, 3, '8095555555', 'Calle Secundaria 789', 'pass789', '1101003@institucion.edu.do', 2, '40146543213', '1101003', true),
    ('Laura', 'Martínez', 0.0, 4, '8094444444', 'Avenida Principal 987', 'pass987', '1101004@institucion.edu.do', 1, '40178765432', '1101004', true);

INSERT INTO Profesores (nombre, apellido, id_area_academica, telefono, direccion, contraseña, correo, id_tipo_documento, documento, matricula, activo)
VALUES
    ('Josefa', 'Adames', 1, '8494567890', 'Calle Principal 123', 'secreta123', 'josefa.adames@institucion.edu.do', 2, '40312345678', '2021001', true),
    ('Cristina', 'Bautista', 2, '8496543210', 'Avenida Central 456', 'password456', 'cristina.bautista@institucion.edu.do', 1, '40198765432', '2021002', true),
    ('Nehomar', 'Silverio', 3, '8095483245', 'Calle Secundaria 789', 'pass789', 'nehomar.silverio@institucion.edu.do', 2, '40356543215', '2021003', true),
    ('Jose', 'Maldonado', 4, '8299085748', 'Avenida Principal 987', 'pass987', 'jose.maldonado@institucion.edu.do', 1, '40387654321', '2021004', true);

INSERT INTO `Secciones` (`numero`, `capacidad`, `id_asignatura`, `id_profesor`, `cupo`, `id_periodo`)
VALUES
    (1, 30, 1, 1, 30, 1),
    (1, 25, 11, 2, 25, 1),
    (2, 20, 11, 2, 20, 1),
    (1, 35, 6, 3, 35, 1),
    (2, 30, 6, 3, 30, 1),
    (3, 30, 6, 3, 30, 2),
    (1, 25, 9, 4, 25, 2),
    (2, 20, 9, 4, 20, 2),
    (3, 35, 9, 4, 35, 2),
    (1, 30, 1, 1, 30, 2),
    (1, 25, 11, 2, 25, 2),
    (2, 20, 11, 2, 20, 2),
    (1, 35, 6, 3, 35, 3),
    (2, 30, 6, 3, 30, 3),
    (3, 30, 6, 3, 30, 3),
    (1, 25, 9, 4, 25, 4),
    (2, 20, 9, 4, 20, 4),
    (3, 35, 9, 4, 35, 4);
    
