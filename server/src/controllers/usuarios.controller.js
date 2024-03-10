const sqlServicios= require ("../services/usuarios.services");

exports.deletUser = async (req, res) =>
{
    const {identificacion} = req.body;
    const resDelete  = await sqlServicios.serviceEliminarUsuario(identificacion); 
    console.log("respuesta en controller usuario", resDelete);
    if (!resDelete){
    return res.status(404).json("No se ha podido eliminar el usuario");
    } 
    res.status(200).json("Usuario eliminado");
}

exports.getUsurioExiste= async (req, res) =>
{
    const {identificacion} = req.body;
    console.log (identificacion);

    const resultado  = await sqlServicios.serviceUsuarioExiste(identificacion); 
    console.log(resultado);
        
    if (!resultado){
        return res.status(404).json("No se ha encontrado el usuario");
    } 
    res.status(200).json(resultado);
}