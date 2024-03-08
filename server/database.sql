CREATE DATABASE perntodo;

CREATE TABLE todo (
    todo_id SERIAL PRIMARY KEY,
    description VARCHAR (255)
);


-- Definición de la función
CREATE OR REPLACE FUNCTION obtenerTodosLosDatos(nombre_tabla VARCHAR)
RETURNS SETOF RECORD AS
$$
BEGIN
    -- Construir la consulta dinámicamente y retornar los resultados
    RETURN QUERY EXECUTE format('SELECT * FROM %I', nombre_tabla);
END;
$$
LANGUAGE plpgsql;


SELECT * FROM obtenerTodosLosDatos('todo') AS (col1 integer, col2 VARCHAR);