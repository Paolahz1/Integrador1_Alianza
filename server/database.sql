create database sede_principal;
use sede_principal;

CREATE TABLE IF NOT EXISTS empresas (
    id_empresa INT PRIMARY KEY,
	descripcion VARCHAR(200),
	url VARCHAR(45),
	nombre VARCHAR(45) NOT NULL
);


CREATE TABLE IF NOT EXISTS usuarios (
	id_usuario SERIAL PRIMARY KEY,
	tipo_usuario VARCHAR(45) NOT NULL,
	nombre VARCHAR(50) NOT NULL,
	email VARCHAR(45),
	telefono VARCHAR(30) NOT NULL,
	tipo_documento VARCHAR(45) NOT NULL,
	documento VARCHAR(45) NOT NULL,
	nombre_usuario VARCHAR(45) NOT NULL,
	contrasena VARCHAR(45) NOT NULL, 
	CONSTRAINT nombre_usuario UNIQUE (nombre_usuario)
);

CREATE TABLE IF NOT EXISTS proyectos (
	id_proyecto SERIAL PRIMARY KEY,
	tipo_proyecto VARCHAR(45) NOT NULL,
	fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	estado_proyecto VARCHAR(45) DEFAULT 'En proceso',
	usuarios_id_usuario INT NOT NULL,
	descripcion VARCHAR (200),
	ubicacion VARCHAR (70),
	presupuesto NUMERIC(10, 2), --
	FOREIGN KEY (usuarios_id_usuario) REFERENCES usuarios (id_usuario) ON DELETE SET NULL
);

CREATE TABLE IF NOT EXISTS etapas (
	id_etapa SERIAL PRIMARY KEY,
	fecha_inicio DATE NOT NULL,
	fecha_fin DATE NOT NULL,
	descripcion_etapa VARCHAR(350) NOT NULL,
	estado_estapa VARCHAR(45) DEFAULT 'No iniciada',
	proyectos_id_proyecto INT NOT NULL,
	CONSTRAINT fk_etapas_proyectos1 FOREIGN KEY (proyectos_id_proyecto)
	REFERENCES proyectos (id_proyecto)
	ON DELETE NO ACTION
);

CREATE TABLE IF NOT EXISTS pagos (
	id_pago SERIAL PRIMARY KEY,
	tipo_pago VARCHAR(50) NOT NULL,
	monto INT NOT NULL,
	proyectos_id_proyecto INT NOT NULL,
	CONSTRAINT fk_pagos_proyectos1 FOREIGN KEY (proyectos_id_proyecto)
	REFERENCES proyectos (id_proyecto)
	ON DELETE NO ACTION
	ON UPDATE NO ACTION
);

CREATE TABLE IF NOT EXISTS documentos (
	id_doc SERIAL PRIMARY KEY,
	contenido JSON NOT NULL,
	proyectos_id_proyecto INT NOT NULL,
	CONSTRAINT fk_documentos_proyectos1 FOREIGN KEY (proyectos_id_proyecto)
		REFERENCES proyectos (id_proyecto)
		ON DELETE NO ACTION
		ON UPDATE NO ACTION
);


CREATE TABLE IF NOT EXISTS productos (
	codigo SERIAL NOT NULL,
	nombre VARCHAR(50) NOT NULL,
	id_producto INT NOT NULL,
	unidad VARCHAR(45),
	costo NUMERIC(10, 2), -- NUMERIC(10, 2) indica 10 dígitos en total, 2 de los cuales son decimales
	descripcion_producto VARCHAR(45),
	empresas_id_empresa INT,
	PRIMARY KEY (codigo),
	FOREIGN KEY (empresas_id_empresa) REFERENCES empresas (id_empresa) ON DELETE SET NULL,
	CONSTRAINT uq_id_producto_empresa UNIQUE (id_producto, empresas_id_empresa)
);


CREATE TABLE IF NOT EXISTS pedidos (
    id_pedido SERIAL PRIMARY KEY,
    fecha_pedido DATE NOT NULL,
    estado VARCHAR(20) NOT NULL DEFAULT 'Pendiente' -- Puedes agregar más estados según tu lógica de negocio
);

CREATE TABLE IF NOT EXISTS detalle_pedidos (
    id_detalle SERIAL PRIMARY KEY,
    id_pedido INT NOT NULL,
    id_producto INT NOT NULL,
    cantidad INT NOT NULL,
    precio_unitario NUMERIC(10, 2) NOT NULL,
    FOREIGN KEY (id_pedido) REFERENCES pedidos (id_pedido) ON DELETE CASCADE,
    FOREIGN KEY (id_producto) REFERENCES productos (id_producto) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS formularios (
    id_formulario SERIAL PRIMARY KEY,
    fecha_envio TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
);

CREATE TABLE IF NOT EXISTS preguntas (
		id_pregunta INT,
		enunciado VARCHAR(200),
		PRIMARY KEY (id_pregunta),
);	

CREATE TABLE IF NOT EXISTS respuestas (
    id_respuesta SERIAL PRIMARY KEY,
    respuesta VARCHAR(500) NOT NULL,
    id_pregunta INT NOT NULL,
    id_usuario INT NOT NULL,
    id_formulario INT NOT NULL,
    FOREIGN KEY (id_pregunta) REFERENCES preguntas(id_pregunta),
    FOREIGN KEY (id_usuario) REFERENCES usuarios(id_usuario),
    FOREIGN KEY (id_formulario) REFERENCES formularios(id_formulario)
);

CREATE TABLE IF NOT EXISTS bitacora_usuarios_eliminados (
    id SERIAL PRIMARY KEY,
    accion VARCHAR(50),
    nombre_usuario VARCHAR(50),
    id_usuario_eliminado VARCHAR(45),
    fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


	INSERT INTO empresas (id_empresa, descripcion, url, nombre) VALUES
	(1, 'Empresa A', 'www.empresa-a.com', 'Empresa A'),
	(2,'Empresa B', 'www.empresa-b.com', 'Empresa B');


-- Insertar datos en la tabla productos
	INSERT INTO productos (id_producto, empresas_id_empresa, nombre, unidad, costo, descripcion_producto) VALUES
	(1, 1, 'Product 1 ','Unidades', 100.56, 'Producto 1 de Empresa 1'),
	(1, 2, 'Producto 2', 'Unidades', 150.78, 'Producto 1 de Empresa 2'),
	(2, 1, 'Producto 3', 'Unidades', 200.8, 'Producto 2 de Empresa 1'),
	(2, 2, 'Producto 4', 'Unidades', 250.0, 'Producto 2 de Empresa 2');


	INSERT INTO usuarios (id_usuario, tipo_usuario, nombre, email, telefono, tipo_documento, documento, nombre_usuario, contrasena)
	VALUES (1,'Cliente','Juan Pérez','juan@example.com',12345678,'DNI',12345678,'juanperez','password'),
	(2,	'Cliente','María López','maria@example.com',987654321,'DNI',87654321,'marialopez','password'),
	(3, 'Admin', 'Paola', NULL, '3165004441', 'cc', '105156482', 'paola777', 'pao123');


	INSERT INTO formularios (id_formulario, estado_formulario, fecha_ingreso, usuarios_id_usuario)
	VALUES (1, 'En proceso', '2024-03-02', 1),
		   (2, 'En espera', '2024-03-02', 2);


	INSERT INTO proyectos (id_proyecto, tipo_proyecto, fecha_registro, estado_proyecto, usuarios_id_usuario)
	VALUES (1, 'piscina', '2024-03-01', 'En proceso', 1),
		   (2, '"Edificio 5 plantas"', '2024-03-01', 'En espera', 2);

	INSERT INTO etapas (id_etapa, fecha_inicio, fecha_Fin, descripcion_etapa, proyectos_id_proyecto)
	VALUES (1, '2024-03-01', '2024-03-15', 'Análisis de requisitos', 1),
		   (2, '2024-03-16', '2024-03-31', 'Desarrollo', 1);

	INSERT INTO notificaciones (id_notificacion, mensaje, proyectos_id_proyecto)
	VALUES (1, 'Recordatorio: Reunión importante el próximo martes.', 1),
		   (2, 'Actualización: Cambio en el horario de entrega del proyecto.', 2);
		
	INSERT INTO pagos (id_pago, tipo_pago, monto, proyectos_id_proyecto)
	VALUES (1, 'Tarjeta de crédito',500, 1),
		   (2, 'Transferencia bancaria',300, 2);


	INSERT INTO documentos (id_doc, contenido, asunto, proyectos_id_proyecto)
	VALUES (1, '{"documento": "Datos personales 1"}', 'Documentos 1', 1),
		   (2, '{"documento": "ingresos cliente 2"}', 'Documentos 2', 2);


	INSERT INTO pedidos (cantidad, proyectos_id_proyecto, productos_id_producto, productos_empresa_id_empresa)
	VALUES ('5 unidades', 1, 1001, 1);


	INSERT INTO respuestas (id_respuesta, respuesta, preguntas_id_pregunta, preguntas_formularios_id_formulario, preguntas_formularios_usuarios_id_usuario)
	VALUES (1, 'Execelente servio', 1, 1, 1),
	(2,'Buen servicio',2,2,2);
	

	INSERT INTO preguntas (id_pregunta, enunciado, formularios_id_formulario, formularios_usuarios_id_usuario)
	VALUES (1, '¿"¿Cómo calificaría nuestro servicio?"', 1, 1),
		(2, '"¿Cuál es su opinión sobre nuestro producto?"', 2, 2);


	select * from documentos 
	select * from empresas   
	select * from etapas     
	select * from formularios
	select * from notificaciones
	select * from pagos
	select * from pedidos
	select * from preguntas
	select * from productos
	select * from proyectos
	select * from respuestas
	select * from usuarios

--Eliminado el asunto de documentos
--Agregado presupuesto a proyectos
--Eliminado el estado de la tabla formularios
C:\Users\Usuario\Integrador1_Alianza