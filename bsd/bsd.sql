create database gestionProyectos;

\c gestionProyectos;

CREATE TABLE ROL (
    idRol SERIAL PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL
);

CREATE TABLE USUARIO (
    idUsuario SERIAL PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL,
    apellidos VARCHAR(50) NOT NULL,
    contrasena VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    idRol INTEGER NOT NULL REFERENCES ROL(idRol)
);

CREATE TABLE INSTITUCION (
    idInstitucion SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    direccion VARCHAR(100) NOT NULL,
    telefono VARCHAR(20) NOT NULL,
    email VARCHAR(100) NOT NULL,
    ciudad VARCHAR(50) NOT NULL
);

CREATE TABLE PROYECTO (
    idProyecto SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    descripcion TEXT NOT NULL,
    objetivos TEXT NOT NULL,
    cronograma TEXT NOT NULL,
    observaciones TEXT,
    fechaInicio DATE NOT NULL,
    fechaFin DATE NOT NULL,
    idInstitucion INTEGER NOT NULL REFERENCES INSTITUCION(idInstitucion),
    fechaCreacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE PROYECTOESTUDIANTES (
    idProyectoEstudiantes SERIAL PRIMARY KEY,
    idProyecto INTEGER NOT NULL REFERENCES PROYECTO(idProyecto),
    idUsuario INTEGER NOT NULL REFERENCES USUARIO(idUsuario),
    UNIQUE (idProyecto, idUsuario)
);

CREATE TABLE ESTADOPROYECTO (
    idEstadoProyecto SERIAL PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL
);

CREATE TABLE HISTORIALESTADO (
    idHistorialEstado SERIAL PRIMARY KEY,
    idProyecto INTEGER NOT NULL REFERENCES PROYECTO(idProyecto),
    idEstadoProyecto INTEGER NOT NULL REFERENCES ESTADOPROYECTO(idEstadoProyecto),
    fechaCambio TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

ALTER TABLE proyectoestudiantes
DROP CONSTRAINT proyectoestudiantes_idusuario_fkey;


ALTER TABLE proyectoestudiantes
ADD CONSTRAINT proyectoestudiantes_idusuario_fkey
FOREIGN KEY (idusuario) REFERENCES usuario(idusuario) ON DELETE CASCADE;


-- Eliminar la restricción actual (ajusta el nombre real del constraint si es diferente)
ALTER TABLE proyecto DROP CONSTRAINT proyecto_idinstitucion_fkey;

-- Volverla a crear con ON DELETE CASCADE
ALTER TABLE proyecto
ADD CONSTRAINT proyecto_idinstitucion_fkey
FOREIGN KEY (idInstitucion)
REFERENCES institucion(idInstitucion)
ON DELETE CASCADE;


-- Proyecto relacionado con Institución
ALTER TABLE proyecto
  DROP CONSTRAINT proyecto_idinstitucion_fkey,
  ADD CONSTRAINT proyecto_idinstitucion_fkey
  FOREIGN KEY (idinstitucion) REFERENCES institucion(idinstitucion) ON DELETE CASCADE;

-- ProyectoEstudiantes relacionado con Proyecto
ALTER TABLE proyectoestudiantes
  DROP CONSTRAINT proyectoestudiantes_idproyecto_fkey,
  ADD CONSTRAINT proyectoestudiantes_idproyecto_fkey
  FOREIGN KEY (idproyecto) REFERENCES proyecto(idproyecto) ON DELETE CASCADE;



ALTER TABLE historialestado
DROP CONSTRAINT historialestado_idproyecto_fkey;

ALTER TABLE historialestado
ADD CONSTRAINT historialestado_idproyecto_fkey
FOREIGN KEY (idProyecto) REFERENCES proyecto(idProyecto) ON DELETE CASCADE;




