const sqlServicios= require ("../services/productos.services");



exports.getAllProductos = async (req, res) =>
{
    const resGetP = await sqlServicios.serviceGetAllProductos(); 
    console.log("respuesta en controller produc", resGetP);

    if (!resGetP){
    return res.status(404).json("No se ha  el usuario");
    } 
    res.status(200).json(resGetP);
}


exports.getProductosByEmpresa = async (req, res) =>
{
    const {id_emp} = req.params;
    const respuesta  = await sqlServicios.serviceGetProductsByEmpresa(id_emp);
    console.log("respuesta en controller ", respuesta);

    if (!respuesta || respuesta.length === 0) {
        return res.status(404).json({ message: 'No se encontraron productos' });
    }
    else{
        res.status(200).json(respuesta );
    }
    
}
