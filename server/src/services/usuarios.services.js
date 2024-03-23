const { query } = require("express");
const pool = require ("../providers/db");
const { use } = require("../routers/todos.routers");

    async function serviceEliminarUsuario (identificacion) {
        try {

            const resultadoExiste  = await serviceUsuarioExiste (identificacion); 
            
            if  (resultadoExiste == 1) {
                const eliminarUsuario = await pool.query ("DELETE FROM USUARIOS WHERE nombre_usuario = ($1)",
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
            console.log(username);
            const resultadoExiste = await pool.query ("SELECT verificar_existencia_usuario ($1) as resultado", [username]);
            console.log (resultadoExiste.rows[0].resultado);
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

   /**
    * The function `serviceAutenticarUsuario` checks if a user exists, retrieves their password, and
    * compares it with the provided password for authentication.
    */
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
    
    
/**
 * The function `serviceProyectosAsociados` retrieves projects associated with a given user by querying
 * a database and returning the results.
 */
    async function serviceProyectosAsociados (nombre_usuario) {
            try {
                const resPool = await pool.query("select * from obtener_proyectos_por_cliente($1)", [nombre_usuario]);
                const respuestas = resPool.rows;
                return respuestas;
            }catch (error) {
                console.error('Error al realizar la operación de red:', error);
                return null;
            }
    } 
/**
 * The function `serviceAllPagosAsociados` retrieves all payments associated with a given user by
 * querying a database function.
 */

    async function serviceAllPagosAsociados (nombre_usuario) {
        try {
            const resPool = await pool.query("select * from obtener_pagos_por_cliente($1)", [nombre_usuario]);
            return resPool.rows;
        }catch (error) {
            console.error('Error al realizar la operación de red:', error);
            return null;
        }
    }

    module.exports = {
        serviceEliminarUsuario,
        serviceUsuarioExiste,
        serviceInsertUsuario,
        serviceAutenticarUsuario,
        serviceProyectosAsociados,
        serviceAllPagosAsociados
    };

    