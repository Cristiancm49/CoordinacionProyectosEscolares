--AGROFARM
CREATE database agrofarm1;

\c agrofarm1;

CREATE SCHEMA seguridad;
CREATE SCHEMA produccion;
CREATE SCHEMA inventario;
CREATE SCHEMA comercial;
CREATE SCHEMA administracion;

-- Secuencias
CREATE SEQUENCE seq_rol;
CREATE SEQUENCE seq_tipo_documento;
CREATE SEQUENCE seq_persona;
CREATE SEQUENCE seq_usuario;
CREATE SEQUENCE seq_usuario_foto;
CREATE SEQUENCE seq_usuario_rol;
CREATE SEQUENCE seq_procedimiento_general;
CREATE SEQUENCE seq_raza;
CREATE SEQUENCE seq_vaca;
CREATE SEQUENCE seq_vaca_foto;
CREATE SEQUENCE seq_procedimiento_vaca;
CREATE SEQUENCE seq_sesion_ordeno;
CREATE SEQUENCE seq_inventario_leche;
CREATE SEQUENCE seq_vaca_ordeno;
CREATE SEQUENCE seq_sesion_medicamento;
CREATE SEQUENCE seq_tipo_medicamento;
CREATE SEQUENCE seq_medicamento;
CREATE SEQUENCE seq_tratamiento;
CREATE SEQUENCE seq_tratamiento_medicamento;
CREATE SEQUENCE seq_cliente;
CREATE SEQUENCE seq_precio_litro;
CREATE SEQUENCE seq_tipo_entrega;
CREATE SEQUENCE seq_venta_leche;
CREATE SEQUENCE seq_metodo_pago;
CREATE SEQUENCE seq_factura;

-- Tabla de roles
CREATE TABLE rol (
  idrol INT PRIMARY KEY DEFAULT nextval('seq_rol'),
  nombrerol VARCHAR(50) NOT NULL UNIQUE
);

-- Tipos de documento
CREATE TABLE tipo_documento (
  idtipodocumento INT PRIMARY KEY DEFAULT nextval('seq_tipo_documento'),
  nombretipodocumento VARCHAR(50) NOT NULL UNIQUE,
  estado BOOLEAN NOT NULL
);

-- Personas
CREATE TABLE persona (
  idpersona INT PRIMARY KEY DEFAULT nextval('seq_persona'),
  documento VARCHAR(30) NOT NULL UNIQUE,
  nombreuno VARCHAR(30) NOT NULL,
  nombredos VARCHAR(30),
  apellidouno VARCHAR(30) NOT NULL,
  apellidodos VARCHAR(30),
  telefono VARCHAR(20),
  tipodocumento INT NOT NULL,
  CONSTRAINT fk_persona_tipo_documento FOREIGN KEY (tipodocumento) REFERENCES tipo_documento (idtipodocumento)
);

-- Usuarios
CREATE TABLE usuario (
  idusuario INT PRIMARY KEY DEFAULT nextval('seq_usuario'),
  correo VARCHAR(100) NOT NULL UNIQUE,
  contrasenausuario VARCHAR(255) NOT NULL,
  idpersona INT NOT NULL UNIQUE,
  CONSTRAINT fk_usuario_persona FOREIGN KEY (idpersona) REFERENCES persona (idpersona)
);

-- Foto del usuario


-- Asignación de roles
CREATE TABLE usuario_rol (
  idusuariorol INT PRIMARY KEY DEFAULT nextval('seq_usuario_rol'),
  idusuario INT NOT NULL,
  idrol INT NOT NULL,
  fechaasignacion TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  estado BOOLEAN NOT NULL,
  CONSTRAINT fk_usuario_rol_usuario FOREIGN KEY (idusuario) REFERENCES usuario (idusuario),
  CONSTRAINT fk_usuario_rol_rol FOREIGN KEY (idrol) REFERENCES rol (idrol)
);

-- Procedimientos generales
CREATE TABLE procedimiento_general (
  idprocedimientogeneral INT PRIMARY KEY DEFAULT nextval('seq_procedimiento_general'),
  idusuario INT NOT NULL,
  fechahora TIMESTAMP NOT NULL,
  nombreprocedimiento VARCHAR(100) NOT NULL,
  horainicio TIME NOT NULL,
  horafin TIME NOT NULL,
  observaciones TEXT,
  CONSTRAINT fk_proc_general_usuario FOREIGN KEY (idusuario) REFERENCES usuario (idusuario)
);

-- Razas
CREATE TABLE raza (
  idraza INT PRIMARY KEY DEFAULT nextval('seq_raza'),
  nombreraza VARCHAR(50) NOT NULL UNIQUE
);

-- Vacas
CREATE TABLE vaca (
  idvaca INT PRIMARY KEY DEFAULT nextval('seq_vaca'),
  nombrevaca VARCHAR(50) NOT NULL,
  descripcion TEXT,
  fechanacimiento DATE NOT NULL,
  idraza INT NOT NULL,
  CONSTRAINT fk_vaca_raza FOREIGN KEY (idraza) REFERENCES raza (idraza)
);

-- Fotos de vacas


-- Procedimientos por vaca
CREATE TABLE procedimiento_vaca (
  idsesionprocedimiento INT PRIMARY KEY DEFAULT nextval('seq_procedimiento_vaca'),
  idvaca INT NOT NULL,
  idusuario INT NOT NULL,
  idprocedimientogeneral INT NOT NULL,
  fechahora TIMESTAMP NOT NULL,
  observaciones TEXT,
  dosis VARCHAR(50),
  CONSTRAINT fk_proc_vaca_usuario FOREIGN KEY (idusuario) REFERENCES usuario (idusuario),
  CONSTRAINT fk_proc_vaca_vaca FOREIGN KEY (idvaca) REFERENCES vaca (idvaca),
  CONSTRAINT fk_proc_vaca_procgeneral FOREIGN KEY (idprocedimientogeneral) REFERENCES procedimiento_general (idprocedimientogeneral)
);

-- Sesiones de ordeño
CREATE TABLE sesion_ordeno (
  idsesionordeno INT PRIMARY KEY DEFAULT nextval('seq_sesion_ordeno'),
  idusuario INT NOT NULL,
  horainicio TIME NOT NULL,
  horafin TIME NOT NULL,
  observaciones TEXT,
  CONSTRAINT fk_sesionordeno_usuario FOREIGN KEY (idusuario) REFERENCES usuario (idusuario)
);

-- Inventario de leche
CREATE TABLE inventario_leche (
  idinventario INT PRIMARY KEY DEFAULT nextval('seq_inventario_leche'),
  fechainicio DATE NOT NULL,
  cantidaddisponible DECIMAL(10,2) NOT NULL CHECK (cantidaddisponible >= 0),
  estado BOOLEAN NOT NULL,
  ultimaactualizacion TIMESTAMP NOT NULL,
  idsesionordeno INT NOT NULL,
  CONSTRAINT fk_inventario_sesion FOREIGN KEY (idsesionordeno) REFERENCES sesion_ordeno (idsesionordeno)
);

-- Detalle de ordeño por vaca
CREATE TABLE vaca_ordeno (
  idvacaordeno INT PRIMARY KEY DEFAULT nextval('seq_vaca_ordeno'),
  idvaca INT NOT NULL,
  idsesionordeno INT NOT NULL,
  cantidadleche DECIMAL(10,2) NOT NULL CHECK (cantidadleche >= 0),
  hora TIME NOT NULL,
  observaciones TEXT,
  CONSTRAINT fk_vacaordeno_vaca FOREIGN KEY (idvaca) REFERENCES vaca (idvaca),
  CONSTRAINT fk_vacaordeno_sesion FOREIGN KEY (idsesionordeno) REFERENCES sesion_ordeno (idsesionordeno)
);

-- Sesiones de medicamentos
CREATE TABLE sesion_medicamento (
  idsesionmedicamento INT PRIMARY KEY DEFAULT nextval('seq_sesion_medicamento'),
  idusuario INT NOT NULL,
  justificacion TEXT,
  CONSTRAINT fk_sesionmed_usuario FOREIGN KEY (idusuario) REFERENCES usuario (idusuario)
);

-- Tipos de medicamento
CREATE TABLE tipo_medicamento (
  idtipomedicamento INT PRIMARY KEY DEFAULT nextval('seq_tipo_medicamento'),
  tipomedicamento VARCHAR(100) NOT NULL UNIQUE
);

-- Medicamentos
CREATE TABLE medicamento (
  idmedicamento INT PRIMARY KEY DEFAULT nextval('seq_medicamento'),
  nombre VARCHAR(100) NOT NULL,
  descripcion TEXT,
  marca VARCHAR(100),
  fechavencimiento DATE,
  tipomedicamento INT NOT NULL,
  CONSTRAINT fk_medicamento_tipo FOREIGN KEY (tipomedicamento) REFERENCES tipo_medicamento (idtipomedicamento)
);

-- Tratamientos
CREATE TABLE tratamiento (
  idtratamiento INT PRIMARY KEY DEFAULT nextval('seq_tratamiento'),
  fechainicio DATE NOT NULL,
  descripcion TEXT,
  justificacion TEXT,
  idvaca INT NOT NULL,
  CONSTRAINT fk_tratamiento_vaca FOREIGN KEY (idvaca) REFERENCES vaca (idvaca)
);

-- Relación tratamiento-medicamento
CREATE TABLE tratamiento_medicamento (
  idtratamientomed INT PRIMARY KEY DEFAULT nextval('seq_tratamiento_medicamento'),
  idtratamiento INT NOT NULL,
  idmedicamento INT NOT NULL,
  CONSTRAINT fk_trat_med_trat FOREIGN KEY (idtratamiento) REFERENCES tratamiento (idtratamiento),
  CONSTRAINT fk_trat_med_med FOREIGN KEY (idmedicamento) REFERENCES medicamento (idmedicamento)
);

-- Clientes
CREATE TABLE cliente (
  idcliente INT PRIMARY KEY DEFAULT nextval('seq_cliente'),
  razonsocial VARCHAR(100) NOT NULL,
  ubicacion TEXT,
  idpersona INT NOT NULL,
  CONSTRAINT fk_cliente_persona FOREIGN KEY (idpersona) REFERENCES persona (idpersona)
);

-- Precio por litro de leche
CREATE TABLE precio_litro (
  idpreciolitro INT PRIMARY KEY DEFAULT nextval('seq_precio_litro'),
  fecha DATE NOT NULL,
  preciolitro DECIMAL(10,2) NOT NULL CHECK (preciolitro >= 0)
);

-- Tipos de entrega
CREATE TABLE tipo_entrega (
  idtipoentrega INT PRIMARY KEY DEFAULT nextval('seq_tipo_entrega'),
  nombretipoentrega VARCHAR(50) NOT NULL
);

-- Ventas de leche
CREATE TABLE venta_leche (
  idventa INT PRIMARY KEY DEFAULT nextval('seq_venta_leche'),
  idcliente INT NOT NULL,
  fechaventa DATE NOT NULL,
  cantidadlitros DECIMAL(10,2) NOT NULL CHECK (cantidadlitros > 0),
  idusuario INT NOT NULL,
  idinventario INT NOT NULL,
  idpreciolitro INT NOT NULL,
  idtipoentrega INT NOT NULL,
  CONSTRAINT fk_venta_cliente FOREIGN KEY (idcliente) REFERENCES cliente (idcliente),
  CONSTRAINT fk_venta_usuario FOREIGN KEY (idusuario) REFERENCES usuario (idusuario),
  CONSTRAINT fk_venta_inventario FOREIGN KEY (idinventario) REFERENCES inventario_leche (idinventario),
  CONSTRAINT fk_venta_precio FOREIGN KEY (idpreciolitro) REFERENCES precio_litro (idpreciolitro),
  CONSTRAINT fk_venta_entrega FOREIGN KEY (idtipoentrega) REFERENCES tipo_entrega (idtipoentrega)
);

-- Métodos de pago
CREATE TABLE metodo_pago (
  idmetodopago INT PRIMARY KEY DEFAULT nextval('seq_metodo_pago'),
  nombremetodopago VARCHAR(50) NOT NULL UNIQUE
);

-- Facturas
CREATE TABLE factura (
  idfactura INT PRIMARY KEY DEFAULT nextval('seq_factura'),
  idventa INT NOT NULL UNIQUE,
  fechafactura DATE NOT NULL,
  estadopago VARCHAR(50) NOT NULL,
  total DECIMAL(10,2) NOT NULL CHECK (total >= 0),
  idmetodopago INT NOT NULL,
  CONSTRAINT fk_factura_venta FOREIGN KEY (idventa) REFERENCES venta_leche (idventa),
  CONSTRAINT fk_factura_metodopago FOREIGN KEY (idmetodopago) REFERENCES metodo_pago (idmetodopago)
);


ALTER TABLE rol SET SCHEMA seguridad;
ALTER TABLE tipo_documento SET SCHEMA seguridad;
ALTER TABLE persona SET SCHEMA seguridad;
ALTER TABLE usuario SET SCHEMA seguridad;

ALTER TABLE usuario_rol SET SCHEMA seguridad;

ALTER TABLE raza SET SCHEMA produccion;
ALTER TABLE vaca SET SCHEMA produccion;

ALTER TABLE procedimiento_general SET SCHEMA produccion;
ALTER TABLE procedimiento_vaca SET SCHEMA produccion;
ALTER TABLE sesion_ordeno SET SCHEMA produccion;
ALTER TABLE vaca_ordeno SET SCHEMA produccion;

ALTER TABLE inventario_leche SET SCHEMA inventario;
ALTER TABLE tipo_medicamento SET SCHEMA inventario;
ALTER TABLE medicamento SET SCHEMA inventario;
ALTER TABLE sesion_medicamento SET SCHEMA inventario;
ALTER TABLE tratamiento SET SCHEMA inventario;
ALTER TABLE tratamiento_medicamento SET SCHEMA inventario;

ALTER TABLE cliente SET SCHEMA comercial;
ALTER TABLE precio_litro SET SCHEMA comercial;
ALTER TABLE tipo_entrega SET SCHEMA comercial;
ALTER TABLE venta_leche SET SCHEMA comercial;
ALTER TABLE factura SET SCHEMA comercial;
ALTER TABLE metodo_pago SET SCHEMA comercial;



----- vistas 
-- Vista para roles
CREATE VIEW seguridad.vw_roles AS
SELECT idrol, nombrerol
FROM seguridad.rol;

-- Vista para tipos de documento
CREATE VIEW seguridad.vw_tipos_documento AS
SELECT idtipodocumento, nombretipodocumento, estado
FROM seguridad.tipo_documento;

-- Vista para asignaciones de roles de usuario
CREATE VIEW seguridad.vw_usuarios_roles AS
SELECT ur.idusuariorol, u.correo, r.nombrerol, ur.fechaasignacion, ur.estado
FROM seguridad.usuario_rol ur
JOIN seguridad.usuario u ON ur.idusuario = u.idusuario
JOIN seguridad.rol r ON ur.idrol = r.idrol;

-- Vista para razas
CREATE VIEW produccion.vw_razas AS
SELECT idraza, nombreraza
FROM produccion.raza;

-- Vista para vacas
CREATE VIEW produccion.vw_vacas AS
SELECT v.idvaca, v.nombrevaca, v.descripcion, v.fechanacimiento, r.nombreraza
FROM produccion.vaca v
JOIN produccion.raza r ON v.idraza = r.idraza;

-- Vista para tipos de medicamentos
CREATE VIEW inventario.vw_tipos_medicamento AS
SELECT idtipomedicamento, tipomedicamento
FROM inventario.tipo_medicamento;

-- Vista para medicamentos
CREATE VIEW inventario.vw_medicamentos AS
SELECT m.idmedicamento, m.nombre, m.descripcion, m.marca, m.fechavencimiento, t.tipomedicamento
FROM inventario.medicamento m
JOIN inventario.tipo_medicamento t ON m.tipomedicamento = t.idtipomedicamento;

-- Vista para precios por litro
CREATE VIEW comercial.vw_precios_litro AS
SELECT idpreciolitro, fecha, preciolitro
FROM comercial.precio_litro;

-- Vista para tipos de entrega
CREATE VIEW comercial.vw_tipos_entrega AS
SELECT idtipoentrega, nombretipoentrega
FROM comercial.tipo_entrega;

-- Vista para métodos de pago
CREATE VIEW comercial.vw_metodos_pago AS
SELECT idmetodopago, nombremetodopago
FROM comercial.metodo_pago;


-- AUDITORIAS

CREATE SCHEMA auditoria;

CREATE OR REPLACE FUNCTION auditoria.log_auditoria_json()
RETURNS TRIGGER AS $$
DECLARE
  tabla TEXT := TG_TABLE_NAME;
BEGIN
  EXECUTE format('INSERT INTO auditoria.%I (operacion, usuario, fecha, datos_anteriores, datos_nuevos) VALUES ($1, $2, $3, $4, $5)', tabla)
  USING TG_OP, current_user, now(), row_to_json(OLD), row_to_json(NEW);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;


CREATE TABLE auditoria.rol (
  id SERIAL PRIMARY KEY,
  operacion TEXT NOT NULL,
  usuario TEXT NOT NULL,
  fecha TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  datos_anteriores JSONB,
  datos_nuevos JSONB
);


CREATE TABLE auditoria.tipo_documento (
  id SERIAL PRIMARY KEY,
  operacion TEXT NOT NULL,
  usuario TEXT NOT NULL,
  fecha TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  datos_anteriores JSONB,
  datos_nuevos JSONB
);


CREATE TABLE auditoria.persona (
  id SERIAL PRIMARY KEY,
  operacion TEXT NOT NULL,
  usuario TEXT NOT NULL,
  fecha TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  datos_anteriores JSONB,
  datos_nuevos JSONB
);


CREATE TABLE auditoria.usuario (
  id SERIAL PRIMARY KEY,
  operacion TEXT NOT NULL,
  usuario TEXT NOT NULL,
  fecha TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  datos_anteriores JSONB,
  datos_nuevos JSONB
);

CREATE TABLE auditoria.usuario_rol (
  id SERIAL PRIMARY KEY,
  operacion TEXT NOT NULL,
  usuario TEXT NOT NULL,
  fecha TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  datos_anteriores JSONB,
  datos_nuevos JSONB
);

CREATE TABLE auditoria.procedimiento_general (
  id SERIAL PRIMARY KEY,
  operacion TEXT NOT NULL,
  usuario TEXT NOT NULL,
  fecha TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  datos_anteriores JSONB,
  datos_nuevos JSONB
);


CREATE TABLE auditoria.raza (
  id SERIAL PRIMARY KEY,
  operacion TEXT NOT NULL,
  usuario TEXT NOT NULL,
  fecha TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  datos_anteriores JSONB,
  datos_nuevos JSONB
);


CREATE TABLE auditoria.vaca (
  id SERIAL PRIMARY KEY,
  operacion TEXT NOT NULL,
  usuario TEXT NOT NULL,
  fecha TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  datos_anteriores JSONB,
  datos_nuevos JSONB
);


CREATE TABLE auditoria.procedimiento_vaca (
  id SERIAL PRIMARY KEY,
  operacion TEXT NOT NULL,
  usuario TEXT NOT NULL,
  fecha TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  datos_anteriores JSONB,
  datos_nuevos JSONB
);


CREATE TABLE auditoria.sesion_ordeno (
  id SERIAL PRIMARY KEY,
  operacion TEXT NOT NULL,
  usuario TEXT NOT NULL,
  fecha TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  datos_anteriores JSONB,
  datos_nuevos JSONB
);


CREATE TABLE auditoria.inventario_leche (
  id SERIAL PRIMARY KEY,
  operacion TEXT NOT NULL,
  usuario TEXT NOT NULL,
  fecha TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  datos_anteriores JSONB,
  datos_nuevos JSONB
);


CREATE TABLE auditoria.vaca_ordeno (
  id SERIAL PRIMARY KEY,
  operacion TEXT NOT NULL,
  usuario TEXT NOT NULL,
  fecha TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  datos_anteriores JSONB,
  datos_nuevos JSONB
);


CREATE TABLE auditoria.sesion_medicamento (
  id SERIAL PRIMARY KEY,
  operacion TEXT NOT NULL,
  usuario TEXT NOT NULL,
  fecha TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  datos_anteriores JSONB,
  datos_nuevos JSONB
);


CREATE TABLE auditoria.tipo_medicamento (
  id SERIAL PRIMARY KEY,
  operacion TEXT NOT NULL,
  usuario TEXT NOT NULL,
  fecha TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  datos_anteriores JSONB,
  datos_nuevos JSONB
);


CREATE TABLE auditoria.medicamento (
  id SERIAL PRIMARY KEY,
  operacion TEXT NOT NULL,
  usuario TEXT NOT NULL,
  fecha TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  datos_anteriores JSONB,
  datos_nuevos JSONB
);




CREATE TABLE auditoria.tratamiento (
  id SERIAL PRIMARY KEY,
  operacion TEXT NOT NULL,
  usuario TEXT NOT NULL,
  fecha TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  datos_anteriores JSONB,
  datos_nuevos JSONB
);


CREATE TABLE auditoria.tratamiento_medicamento (
  id SERIAL PRIMARY KEY,
  operacion TEXT NOT NULL,
  usuario TEXT NOT NULL,
  fecha TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  datos_anteriores JSONB,
  datos_nuevos JSONB
);


CREATE TABLE auditoria.cliente (
  id SERIAL PRIMARY KEY,
  operacion TEXT NOT NULL,
  usuario TEXT NOT NULL,
  fecha TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  datos_anteriores JSONB,
  datos_nuevos JSONB
);


CREATE TABLE auditoria.precio_litro (
  id SERIAL PRIMARY KEY,
  operacion TEXT NOT NULL,
  usuario TEXT NOT NULL,
  fecha TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  datos_anteriores JSONB,
  datos_nuevos JSONB
);


CREATE TABLE auditoria.tipo_entrega (
  id SERIAL PRIMARY KEY,
  operacion TEXT NOT NULL,
  usuario TEXT NOT NULL,
  fecha TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  datos_anteriores JSONB,
  datos_nuevos JSONB
);

CREATE TABLE auditoria.venta_leche (
  id SERIAL PRIMARY KEY,
  operacion TEXT NOT NULL,
  usuario TEXT NOT NULL,
  fecha TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  datos_anteriores JSONB,
  datos_nuevos JSONB
);




CREATE TABLE auditoria.metodo_pago (
  id SERIAL PRIMARY KEY,
  operacion TEXT NOT NULL,
  usuario TEXT NOT NULL,
  fecha TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  datos_anteriores JSONB,
  datos_nuevos JSONB
);




CREATE TABLE auditoria.factura (
  id SERIAL PRIMARY KEY,
  operacion TEXT NOT NULL,
  usuario TEXT NOT NULL,
  fecha TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  datos_anteriores JSONB,
  datos_nuevos JSONB
);


CREATE TRIGGER tr_audit_rol
AFTER INSERT OR UPDATE OR DELETE ON seguridad.rol
FOR EACH ROW EXECUTE FUNCTION auditoria.log_auditoria_json();

CREATE TRIGGER tr_audit_tipo_documento
AFTER INSERT OR UPDATE OR DELETE ON seguridad.tipo_documento
FOR EACH ROW EXECUTE FUNCTION auditoria.log_auditoria_json();

CREATE TRIGGER tr_audit_persona
AFTER INSERT OR UPDATE OR DELETE ON seguridad.persona
FOR EACH ROW EXECUTE FUNCTION auditoria.log_auditoria_json();

CREATE TRIGGER tr_audit_usuario
AFTER INSERT OR UPDATE OR DELETE ON seguridad.usuario
FOR EACH ROW EXECUTE FUNCTION auditoria.log_auditoria_json();


CREATE TRIGGER tr_audit_usuario_rol
AFTER INSERT OR UPDATE OR DELETE ON seguridad.usuario_rol
FOR EACH ROW EXECUTE FUNCTION auditoria.log_auditoria_json();

CREATE TRIGGER tr_audit_procedimiento_general
AFTER INSERT OR UPDATE OR DELETE ON produccion.procedimiento_general
FOR EACH ROW EXECUTE FUNCTION auditoria.log_auditoria_json();

CREATE TRIGGER tr_audit_raza
AFTER INSERT OR UPDATE OR DELETE ON produccion.raza
FOR EACH ROW EXECUTE FUNCTION auditoria.log_auditoria_json();

CREATE TRIGGER tr_audit_vaca
AFTER INSERT OR UPDATE OR DELETE ON produccion.vaca
FOR EACH ROW EXECUTE FUNCTION auditoria.log_auditoria_json();


CREATE TRIGGER tr_audit_procedimiento_vaca
AFTER INSERT OR UPDATE OR DELETE ON produccion.procedimiento_vaca
FOR EACH ROW EXECUTE FUNCTION auditoria.log_auditoria_json();

CREATE TRIGGER tr_audit_sesion_ordeno
AFTER INSERT OR UPDATE OR DELETE ON produccion.sesion_ordeno
FOR EACH ROW EXECUTE FUNCTION auditoria.log_auditoria_json();

CREATE TRIGGER tr_audit_inventario_leche
AFTER INSERT OR UPDATE OR DELETE ON inventario.inventario_leche
FOR EACH ROW EXECUTE FUNCTION auditoria.log_auditoria_json();

CREATE TRIGGER tr_audit_vaca_ordeno
AFTER INSERT OR UPDATE OR DELETE ON produccion.vaca_ordeno
FOR EACH ROW EXECUTE FUNCTION auditoria.log_auditoria_json();

CREATE TRIGGER tr_audit_sesion_medicamento
AFTER INSERT OR UPDATE OR DELETE ON inventario.sesion_medicamento
FOR EACH ROW EXECUTE FUNCTION auditoria.log_auditoria_json();

CREATE TRIGGER tr_audit_tipo_medicamento
AFTER INSERT OR UPDATE OR DELETE ON inventario.tipo_medicamento
FOR EACH ROW EXECUTE FUNCTION auditoria.log_auditoria_json();

CREATE TRIGGER tr_audit_medicamento
AFTER INSERT OR UPDATE OR DELETE ON inventario.medicamento
FOR EACH ROW EXECUTE FUNCTION auditoria.log_auditoria_json();

CREATE TRIGGER tr_audit_tratamiento
AFTER INSERT OR UPDATE OR DELETE ON inventario.tratamiento
FOR EACH ROW EXECUTE FUNCTION auditoria.log_auditoria_json();

CREATE TRIGGER tr_audit_tratamiento_medicamento
AFTER INSERT OR UPDATE OR DELETE ON inventario.tratamiento_medicamento
FOR EACH ROW EXECUTE FUNCTION auditoria.log_auditoria_json();

CREATE TRIGGER tr_audit_cliente
AFTER INSERT OR UPDATE OR DELETE ON comercial.cliente
FOR EACH ROW EXECUTE FUNCTION auditoria.log_auditoria_json();

CREATE TRIGGER tr_audit_precio_litro
AFTER INSERT OR UPDATE OR DELETE ON comercial.precio_litro
FOR EACH ROW EXECUTE FUNCTION auditoria.log_auditoria_json();

CREATE TRIGGER tr_audit_tipo_entrega
AFTER INSERT OR UPDATE OR DELETE ON comercial.tipo_entrega
FOR EACH ROW EXECUTE FUNCTION auditoria.log_auditoria_json();

CREATE TRIGGER tr_audit_venta_leche
AFTER INSERT OR UPDATE OR DELETE ON comercial.venta_leche
FOR EACH ROW EXECUTE FUNCTION auditoria.log_auditoria_json();

CREATE TRIGGER tr_audit_metodo_pago
AFTER INSERT OR UPDATE OR DELETE ON comercial.metodo_pago
FOR EACH ROW EXECUTE FUNCTION auditoria.log_auditoria_json();

CREATE TRIGGER tr_audit_factura
AFTER INSERT OR UPDATE OR DELETE ON comercial.factura
FOR EACH ROW EXECUTE FUNCTION auditoria.log_auditoria_json();
