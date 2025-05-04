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
