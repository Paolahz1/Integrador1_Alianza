const sqlServicios= require ("../services/proyectos.services");


exports.postProyecto= async (req, res) =>
{
    const {tipo_proyecto, usuarios_id_usuario, descripcion, ubicacion } = req.body;
    const res = await sqlServicios.serviceInsertProyecto( tipo_proyecto, usuarios_id_usuario, descripcion, ubicacion ); 

    console.log("respuesta en controller usuario", res);
    if (!res){
    return res.status(404).json("No se ha podido eliminar el usuario");
    } 
    res.status(200).json("Usuario eliminado");
}

