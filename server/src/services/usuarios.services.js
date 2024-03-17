    const { query } = require("express");
const pool = require ("../providers/db");

    async function serviceEliminarUsuario (identificacion) {
        try {

            const resultadoExiste  = await serviceUsuarioExiste (identificacion); 
            const usuarioExists = resultadoExiste.rows[0].resultado;
            
            if  (usuarioExists == 1) {
                const eliminarUsuario = await pool.query ("SELECT  delete_user_by_id($1)",
                [identificacion] );
                return eliminarUsuario;
            } else {
                return 0;
            }
        } catch (error) {
            console.error('Error al realizar la operación de red:', error);
            return null;
        }
    }
    //Debe retornar 1 en caso de existir y 0 en caso de no ser encontrado.
    async function serviceUsuarioExiste (username) {
        try {
            const resultadoExiste = await pool.query ("SELECT verificar_existencia_usuario ($1) as resultado", [username]);
            return userExiste = resultadoExiste.rows[0].resultado;
        } catch (error) {
            return null;
        }
    }

    async function serviceInsertUsuario (tipo_usuario, nombre, email, telefono, tipo_documento, documento, nombre_usuario, contrasena) {
    
        const userExiste =  await serviceUsuarioExiste (nombre_usuario); 
        if (userExiste == 0) {
            try {
                await pool.query ("CALL registrar_usuario ($1, $2, $3, $4, $5, $6, $7, $8 )",[ tipo_usuario, nombre, email, telefono, tipo_documento, documento, nombre_usuario, contrasena] ); 
                return 0;
            } catch (error) {
                return null;
            }
        }
        if(userExiste == 1) {
            return 1; 
        }
    }

    async function serviceAutenticarUsuario (nombre_usuario, contrasena) {

        const userExiste =  await serviceUsuarioExiste (nombre_usuario); 

        if (userExiste == 1) {
            try {
                const resContrasena = await pool.query("SELECT obtener_contrasena ($1) as resultado", [nombre_usuario]);
                const password = resContrasena.rows[0].resultado;
                
                if (password == contrasena){
                    return 1;
                }
                else{
                    return 2; 
                }

            }catch (error) {
                console.error('Error al realizar la operación de red:', error);
                return null;
            }
        }
        else if(userExiste == 0) {
            return 0;
        }
    }
    
    module.exports = {
        serviceEliminarUsuario,
        serviceUsuarioExiste,
        serviceInsertUsuario,
        serviceAutenticarUsuario
    };

    