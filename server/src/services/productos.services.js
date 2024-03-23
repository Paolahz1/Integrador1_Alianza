const pool = require ("../providers/db");

    async function serviceGetAllProductsMetales () {
        try{
            const respuesta = await pool.query ("SELECT * FROM pruebaUsuario") ;
            return respuesta.rows; 
        } catch (error) {
            console.error('Error al realizar la operación de red:', error);
            return null;
        }
}
module.exports = {
    serviceGetAllProductsMetales,
    
}