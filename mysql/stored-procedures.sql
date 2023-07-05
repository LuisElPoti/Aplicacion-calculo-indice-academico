DELIMITER // 
CREATE PROCEDURE CalcularIndiceEstudiante (IN matricula varchar(7)) BEGIN
DECLARE Puntos_Generales DECIMAL(6, 2);
DECLARE Puntos_Trimestre DECIMAL(6, 2);
DECLARE Creditos_Generales DECIMAL(6, 2);
DECLARE Creditos_Trimestre DECIMAL(6, 2);
DECLARE Indice_General DECIMAL(6, 2);
DECLARE Indice_Trimestral DECIMAL(6, 2);
DECLARE Trimestres_Aprobados INT;
SET Trimestres_Aprobados = (
        SELECT COUNT(distinct SI.id_periodo)
        FROM Historico_Academico as HI
            INNER JOIN Secciones as SI ON SI.id = HI.id_seccion
            INNER JOIN Periodos as P ON P.id = SI.id_periodo
        WHERE P.id_estado_periodo = 3
            AND HI.id_estudiante = (
                SELECT id
                FROM Estudiantes
                WHERE matricula = matricula
            )
    );
SET Puntos_Generales = (
        SELECT SUM(puntos_honor)
        FROM Historico_Academico
        WHERE id_estudiante = (
                SELECT id
                FROM Estudiantes
                WHERE matricula = matricula
            )
            AND id_estado_historico IN (1, 2)
    );
SET Puntos_Trimestre = (
        SELECT SUM(H.puntos_honor)
        FROM Historico_Academico as H
            INNER JOIN Secciones as S ON S.id = H.id_seccion
        WHERE H.id_estudiante = (
                SELECT id
                FROM Estudiantes
                WHERE matricula = matricula
            )
            AND H.id_estado_historico IN (1, 2)
            AND S.id_periodo = (
                SELECT MAX(SI.id_periodo)
                FROM Historico_Academico as HI
                    INNER JOIN Secciones as SI ON SI.id = HI.id_seccion
                    INNER JOIN Periodos as P ON P.id = SI.id_periodo
                WHERE P.id_estado_periodo = 3
                    AND HI.id_estudiante = (
                        SELECT id
                        FROM Estudiantes
                        WHERE matricula = matricula
                    )
            )
    );
SET Creditos_Generales = (
        SELECT SUM(A.creditos)
        FROM Historico_Academico as H
            INNER JOIN Secciones as S ON H.id_seccion = S.id
            INNER JOIN Asignaturas as A ON S.id_asignatura = A.id
        WHERE H.id_estudiante = (
                SELECT id
                FROM Estudiantes
                WHERE matricula = matricula
            )
            AND H.id_estado_historico IN (1, 2)
    );
SET Creditos_Trimestre = (
        SELECT SUM(A.creditos)
        FROM Historico_Academico as H
            INNER JOIN Secciones as S ON H.id_seccion = S.id
            INNER JOIN Asignaturas as A ON S.id_asignatura = A.id
        WHERE H.id_estudiante = (
                SELECT id
                FROM Estudiantes
                WHERE matricula = matricula
            )
            AND H.id_estado_historico IN (1, 2)
            AND S.id_periodo = (
                SELECT MAX(SI.id_periodo)
                FROM Historico_Academico as HI
                    INNER JOIN Secciones as SI ON SI.id = HI.id_seccion
                    INNER JOIN Periodos as P ON P.id = SI.id_periodo
                WHERE P.id_estado_periodo = 3
                    AND HI.id_estudiante = (
                        SELECT id
                        FROM Estudiantes
                        WHERE matricula = matricula
                    )
            )
    );
IF Creditos_Generales = 0 THEN
SET Creditos_Generales = 1;
SET Puntos_Generales = 0;
END IF;
IF Creditos_Trimestre = 0 THEN
SET Creditos_Trimestre = 1;
SET Puntos_Trimestre = 0;
END IF;
SET Indice_General = Puntos_Generales / Creditos_Generales;
SET Indice_Trimestral = Puntos_Trimestre / Creditos_Trimestre;
SELECT Indice_General as Indice;
SET SQL_SAFE_UPDATES = 0;
UPDATE Estudiantes
SET indice_general = Indice_General,
    indice_trimestral = Indice_Trimestral,
    trimestres_aprobados = Trimestres_Aprobados,
    creditos_aprobados = Creditos_Generales
WHERE matricula = matricula;
END; 

//


-- CALL CalcularIndiceEstudiante('1101001')
-- DROP PROCEDURE CalcularIndiceEstudiante

-- select * from estudiantes