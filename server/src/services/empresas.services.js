const e = require("express");
const pool = require ("../providers/db");

async function serviceEmpresaExiste (id_empresa) {

    try {
        //retorna 1 en caso de existir, 0 en caso de no existir
        const resultadoExiste = await pool.query ("SELECT verificar_existencia_empresa1 ($1) as resultado", [id_empresa]);
        const empresaExiste = resultadoExiste.rows[0].resultado; 
        return empresaExiste;
    } catch (error) {
        console.error('Error al realizar la operación de red:', error);
        return null;
    }
}

async function serviceDeleteEmpresa (id_empresa) {
    const resExiste =  await serviceEmpresaExiste (id_empresa); 
    //En caso de que el usuario si exita, ingresa a eliminarlo 
    if (resExiste == 1 ) {
        try {
            const result = await pool.query ("CALL eliminar_empresa($1)",[id_empresa ] ); 
            console.log (result.rowCount);
            return 1;
        }catch (error) {
            return undefined;
        }
    }
    if(resExiste == 0){
        return 0;
    }
    else{
        return undefined; 
    }
}

async function serviceGetEmpresas () {
    try {
        const respuesta = await pool.query ("SELECT * FROM vista_empresa") ;
        return respuesta.rows; 
        
    } catch (error) {
        console.error('Error al obtener los datos de la vista_empresa:', error);
        throw error; // Lanza el error para ser manejado en el controlador
    }
}

//TERMINAR EN CONTROLERS --------------------------------------------------------------------------------
async function serviceUpdateUrlEmpresas (idEmpresa, nuevaUrl) {
    try {
        await pool.query ("CALL actualizar_url_empresa($1, $2)", [idEmpresa, nuevaUrl]) ;
        return 1; 
        
    } catch (error) {
        console.error('Error al obtener los datos de la vista_empresa:', error);
        return null;
    }
}

async function serviceUpdateDescEmpresa  (idEmpresa, nuevaDescrip) {
    try {
        await pool.query ("CALL actualizar_descripcion_empresa($1, $2)", [idEmpresa, nuevaDescrip]) ;
        return 1; 
        
    } catch (error) {
        console.error('Error al obtener los datos de la vista_empresa:', error);
        return null;
    }
}

module.exports = {
    serviceEmpresaExiste,
    serviceDeleteEmpresa,
    serviceGetEmpresas,
    serviceUpdateUrlEmpresas,
    serviceUpdateDescEmpresa
}

