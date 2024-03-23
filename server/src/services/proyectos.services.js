const pool = require ("../providers/db");


async function serviceInsertProyecto (tipo_proyecto, usuarios_id_usuario, descripcion, ubicacion) {

        try {
            await pool.query ("CALL crear_proyecto ($1, $2, $3, $4)",[tipo_proyecto, usuarios_id_usuario, descripcion, ubicacion] ); 
            return 0;
        } catch (error) {
            return null;
        }
}

module.exports = {
    serviceInsertProyecto,
}