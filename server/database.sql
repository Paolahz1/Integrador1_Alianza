INSERT INTO usuarios (nombre, identificacion, numero_identificacion, nombre_usuario, contrasena_hash) VALUES 
('Juan Perez', 'DNI', '12345678X', 'juanperez', 'hash_de_la_contrasena1'),
('Ana Gómez', 'Pasaporte', 'AB123456C', 'anagomez', 'hash_de_la_contrasena2'),
('Luis Martínez', 'DNI', '87654321Z', 'luismartinez', 'hash_de_la_contrasena3');

CREATE OR REPLACE FUNCTION  usuarioExiste (user_id VARCHAR)
RETURNS INT
LANGUAGE plpgsql
AS $$
BEGIN
    -- Verificar si el usuario existe
    IF EXISTS (SELECT 1 FROM usuarios WHERE numero_identificacion = user_id) THEN
        RETURN  1; -- Usuario encontrado y
    ELSE
        RETURN 0; -- Usuario no encontrado
    END IF;
END;
$$;

SELECT usuarioExiste ('1234567X') as resultado;