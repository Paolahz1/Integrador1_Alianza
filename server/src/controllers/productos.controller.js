const sqlServicios= require ("../services/productos.services");



exports.getProductos = async (req, res) =>
{
    const resGetP = await sqlServicios.serviceGetAllProductsMetales(); 
    console.log("respuesta en controller produc", resGetP);

    if (!resGetP){
    return res.status(404).json("No se ha podido eliminar el usuario");
    } 
    res.status(200).json(resGetP);
}

