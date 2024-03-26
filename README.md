<!--
![Anurag's GitHub stats](https://github-readme-stats.vercel.app/api?username=Paolahz1&show_icons=true&theme=radical)
[![Top Langs](https://github-readme-stats.vercel.app/api/top-langs/?username=Paolahz1)](https://github.com/Paolahz1/github-readme-stats)
-->

<a name="readme-top"></a>

## Creación de tablas




### Tablas de Formulario


La utilización de múltiples tablas en una base de datos para un formulario de preguntas sigue las mejores prácticas de diseño de bases de datos relacionales. 

**Separación de Responsabilidades:**

Cada tabla tiene una responsabilidad específica. La tabla de formularios almacena información general sobre los formularios, como su nombre y fecha de envío. La tabla de preguntas almacena detalles sobre las preguntas, como su texto y tipo. Y la tabla de respuestas almacena las respuestas proporcionadas por los usuarios.
Esta separación de responsabilidades ayuda a organizar y estructurar la información de manera lógica y coherente.

* SQL 
```sh

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
```
### Tablas pedido 

La tabla detalle_pedido se encarga de almacenar los detalles específicos de cada pedido,
incluyendo la referencia al pedido (id_pedido), el producto escogido (id_producto), la cantidad pedida
y el precio unitario al momento del pedido.

* SQL
```sh


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
```

<!-- ROADMAP -->
## Roadmap

- [x] Crear tablas para el formulario
- [x] Crear tablas para los pedidos
- [ ] Add Additional Templates w/ Examples
- [ ] Add "components" document to easily copy & paste sections of the readme
- [ ] Multi-language Support


See the [open issues](https://github.com/othneildrew/Best-README-Template/issues) for a full list of proposed features (and known issues).
