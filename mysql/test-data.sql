INSERT INTO Tipo_Documento (nombre, descripcion)
VALUES ('Cédula', 'Documento de Identidad Dominicano');

INSERT INTO Administradores(nombre, apellido, telefono, direccion, contraseña, correo, id_tipo_documento, documento, matricula, activo)
VALUES ('Gustavo', 'Mejia', '0000000000', 'Calle Gustavo Mejia Ricart', 'Pepito1234', 'Gustavo.Mejia@institucion.edu.do', 1, '123456789', '3000001',  true)