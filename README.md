<!--
![Anurag's GitHub stats](https://github-readme-stats.vercel.app/api?username=Paolahz1&show_icons=true&theme=radical)
[![Top Langs](https://github-readme-stats.vercel.app/api/top-langs/?username=Paolahz1)](https://github.com/Paolahz1/github-readme-stats)
-->

<a name="readme-top"></a>


## 🚩 Table of Contents

- [Creación de tablas](#Creación-de-tablas-) 
  - [Tablas de Formulario](#Tablas-de-Formulario)
  - [Tablas de Pedidos](#Tablas-pedido)
- [Documentación enviós API](#Documentación-de-envíos-API-)
  - [Envío usuarios](#Usuarios-API)

## Creación de tablas ⭐️




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

## Documentación de envíos API 🚀
El frontend ha de recibir la información conforme se presenta a continuación. Es desición del desarrollador determinar cómo hará uso de estas respuestas. 
 
Ejemplo de cómo se forma el URL al cuál se le hace el fetch en localhost: http://localhost:5000/aquí-la-continuación-del-url 
 
## Empresas API

1. Obtener todas las empresas en la BD:
   La URL completa, para esta solicitud HTTP específica sería la siguiente: http://localhost:5000/empresas/getAll

   Método de tipo: GET

   *No requiere hacer envío de ningún dato*
   - Petición exitosa
     <details><summary><b>Respuesta JSON del servidor</b></summary>

     ```diff
     {
         "empresas": [
             {
                 "identificador": 1,
                 "descripcion": "Empresa 1-Descripción",
                 "url": "http://empresa1.com",
                 "razon_social": "Empresa 1"
             },
             {
                 "identificador": 2,
                 "descripcion": null,
                 "url": "http://empresa2.com",
                 "razon_social": "Empresa 2"
             }
         ]
     }
     ```
     </details>

2. Eliminar una empresa de la BD

   URL: ../empresas/delete/

   Método de tipo: DELETE
   
   *Requiere hacer envío del id_empresa*

   Se manejan los siguientes casos:

	- Petición exitosa
	  <details><summary><b>Ejemplo envío al server</b></summary>
	
	     ```diff
	     {
	         "id_empresa": "2"
	     }
	     ```
	     </details>
	
	- Petición fallida, empresa no encontrada
		<details><summary><b>Ejemplo envío al server</b></summary>
		
		```diff
		{
		"id_empresa": "5"
		}
		```
		</details>
		
		<details><summary><b>Respuesta JSON del server</b></summary>
		
		```diff
		{
		    "id_empresa": "5"
		}
		```
		</details>
	
	- Petición fallida, error en el envío de los datos
		<details><summary><b>Ejemplo envío al server</b></summary>
			 
		```diff
		{
		    "id_empresa": "jakskajskjasa"
		}
		```
			
		</details>
		
		<details><summary><b>Respuesta JSON del server</b></summary>
			
		```diff
		{
		    "message": "No se ha podido eliminar la empresa",
		    "data": -1
		}
		```
		</details>
	

3. Crear una empresa de la BD

   URL: ../empresas/create/

   Método de tipo: POST
   
   *Requiere hacer envío de id_empresa, descripcion, url, nombre*

   Se manejan los siguientes casos:
   - Petición exitosa
		<details><summary><b>Ejemplo envío al server</b></summary>

		```diff
		{
		    "id_empresa":"1",
		    "descripcion":"Empresa bonita",
		    "url":"'www.empresaa.com",
		    "nombre":"Methalica"
		}
		```
		</details>

		<details><summary><b>Respuesta JSON del server</b></summary>
			
		```diff
		{
		    "message": "Empresa creada",
		    "data": 1
		}
		```
		</details>
     
   - Petición fallida, una empresa existente no se puede volver a crear  
		<details><summary><b>Ejemplo envío al server</b></summary>

		```diff
		{
		    "id_empresa":"1",
		    "descripcion":"Empresa bonita x2",
		    "url":"'www.empresaa.com ",
		    "nombre":"Methalica"
		}
		```
		</details>

		<details><summary><b>Respuesta JSON del server</b></summary>
			
		```diff
		{
		    "message": "La empresa ya existe",
		    "data": 0
		}
		```
		</details>
  
4. Actualizar una empresa de la BD

   URL: ../empresas/update/


   Método de tipo: PUT
   
   *Requiere hacer envío de id_empresa, url*

   Siga los ejemplos de envío anteriores, recuerde utilizar los mismos nombres de atributos que existen en la base de datos.

   La misma idea para la **respuesta del server:**

	<details><summary><b>Respuesta JSON del server</b></summary>
			
	```diff
		if (respuesta == (null||undefined)){
	        + return res.status(404).json({message: "No se ha podido actualizar la 	empresa", data: -1} );
	   	 } 
	    	else {
	        + res.status(200).json({message:"Empresa actualizada", data: 1});
  		}
	```
	</details>
  

     
<!-- ROADMAP -->
## Roadmap

- [x] Crear tablas para el formulario
- [x] Crear tablas para los pedidos
- [ ] Probar y documentar los métodos para los usuarios
- [ ] Add "components" document to easily copy & paste sections of the readme
- [ ] Multi-language Support

