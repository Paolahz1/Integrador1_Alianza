    const pool = require ("../providers/db");

    async function serviceEliminarUsuario (identificacion) {
        try {

            const resultadoExiste  = await serviceUsuarioExiste (identificacion); 
            const usuarioExists = resultadoExiste.rows[0].resultado;
            
            if  (usuarioExists == 1) {
                const eliminarUsuario = await pool.query ("SELECT  delete_user_by_id($1)",
                [identificacion] );
                return eliminarUsuario;
            } 
            else{ 
                return null;
            }
        } catch (error) {
            
        }
    }

    async function serviceUsuarioExiste (identificacion) {
        try {
            return resultadoExiste = await pool.query ("SELECT usuarioExiste ($1) as resultado", [identificacion] 
            );

        } catch (error) {
            
        }
    }


    module.exports = {
        serviceEliminarUsuario,
        serviceUsuarioExiste,
    };

    