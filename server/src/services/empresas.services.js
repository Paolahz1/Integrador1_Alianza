const e = require("express");
const pool = require ("../providers/db");

async function serviceEmpresaExiste (id_empresa) {

    try {
        //retorna 1 en caso de existir, 0 en caso de no existir
        const resultadoExiste = await pool.query ("SELECT verificar_existencia_empresa1 ($1) as resultado", [id_empresa]);
        return  resultadoExiste.rows[0].resultado; 
    } catch (error) {
        console.error('Error al realizar la operación de red:', error);
        return null;
    }
}

async function serviceDeleteEmpresa (id_empresa) {
    const resExiste =  await serviceEmpresaExiste (id_empresa); 
    //En caso de que el usuario si exita, ingresa a eliminarlo
    try {
        if (resExiste == 1 ) {
        
            const result = await pool.query ("CALL eliminar_empresa($1)",[id_empresa ] ); 
            console.log (result.rowCount);
            return 1;
        }
        else{
            return resExiste;
        }
    }catch (error) {
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
async function serviceUpdateUrlEmpresas (id_empresa, nuevaUrl) {
    const resExiste = await serviceEmpresaExiste(id_empresa); 
    try {
        if (resExiste == 1 ) {
            await pool.query("CALL actualizar_url_empresa($1, $2)", [id_empresa, nuevaUrl]);
            return 1; 
        } else {
            return resExiste; 
        }
    } catch (error) {
        console.error('Error al obtener los datos:', error);
        return null;
    }
}

async function serviceUpdateDescEmpresa  (id_empresa, nuevaDescrip) {
    try {
        await pool.query ("CALL actualizar_descripcion_empresa($1, $2)", [id_empresa, nuevaDescrip]) ;
        return 1; 
        
    } catch (error) {
        console.error('Error al obtener los datos de la vista_empresa:', error);
        return null;
    }
}

async function serviceCreateEmpresa  (id_empresa, descripcion, url, nombre) {

    const resExiste = await serviceEmpresaExiste(id_empresa); 
    try {
        if (resExiste != 1 ) {
            const query = `
            INSERT INTO empresas (id_empresa, descripcion, url, nombre)
            VALUES ($1, $2, $3, $4)
            `;
            await pool.query (query, [id_empresa, descripcion, url, nombre]) ;
            return 1; 
        } else {
            return 0; 
        }
    } catch (error) {
        console.error(error);
        return null;
    }
}


module.exports = {
    serviceEmpresaExiste,
    serviceDeleteEmpresa,
    serviceGetEmpresas,
    serviceUpdateUrlEmpresas,
    serviceUpdateDescEmpresa,
    serviceCreateEmpresa
}

