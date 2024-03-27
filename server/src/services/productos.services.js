const pool = require ("../providers/db");

async function serviceGetAllProductos () {
    try{
        const respuesta = await pool.query ("SELECT * FROM productos") ;
        return respuesta.rows; 
    } catch (error) {
        console.error('Error al realizar la operación de red:', error);
        return null;
    }
}

async function serviceGetProductsByEmpresa (id_emp) { 
        try{
            const respuesta = await pool.query ("SELECT * FROM obtener_productos_por_emp($1)", [id_emp]) ;
            return respuesta.rows; 
        } catch (error) {
            console.error('Error al realizar la operación: ', error);
            return null;
        }
}
module.exports = {
    serviceGetAllProductos,
    serviceGetProductsByEmpresa,
    
}