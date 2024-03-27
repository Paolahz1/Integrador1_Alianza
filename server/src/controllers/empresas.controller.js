const sqlServicios = require ("../services/empresas.services")


exports.deleteEmpresa = async (req, res) =>
{
    const {id_empresa} = req.body;
    const resDelete  = await sqlServicios.serviceDeleteEmpresa(id_empresa);
    console.log("respuesta en controller ", resDelete);

    if (resDelete == (null||undefined)){
        return res.status(404).json({message: "No se ha podido eliminar la empresa", data: -1} );
    } 
    if (resDelete == 0){
    res.status(200).json({message: "Empresa no encontrada", data: 0});

    }
    else {
        res.status(200).json({message:"Empresa eliminada", data: 1});
    }
}


exports.getEmpresas = async (req, res) =>
{
    try {
        const empresas = await sqlServicios.serviceGetEmpresas();
        console.log (empresas)
        if (!empresas || empresas.length === 0) {
            return res.status(404).json({ message: 'No se encontraron empresas' });
        }
        else{
            res.status(200).json(empresas);
        }
    } catch (error) {
        res.status(500).json({ error: 'Error en el servidor' });    
        console.error('Error al obtener empresas:', error);
    }
}

exports.updateEmpresa = async (req, res) =>
{
    const {id_empresa, url} = req.body;
    const respuesta  = await sqlServicios.serviceUpdateUrlEmpresas(id_empresa, url);
    console.log("respuesta en controller ", respuesta);

    if (respuesta == (null||undefined)){
        return res.status(404).json({message: "No se ha podido actualizar la empresa", data: -1} );
    } 
    if (respuesta == 0){
    res.status(200).json({message: "Empresa no encontrada", data: 0});

    }
    else {
        res.status(200).json({message:"Empresa actualizada", data: 1});
    }
}


exports.postEmpresa = async (req, res) =>
{
    const {id_empresa, descripcion, url, nombre} = req.body;
    const respuesta  = await sqlServicios.serviceCreateEmpresa(id_empresa, descripcion, url, nombre);
    //console.log("respuesta en controller ", respuesta);

    if (respuesta == (null||undefined)){
        return res.status(404).json({message: "No se ha podido crear la empresa", data: -1} );
    } 
    if (respuesta == 0){
    res.status(200).json({message: "La empresa ya existe", data: 0});

    }
    else {
        res.status(200).json({message:"Empresa creada", data: 1});
    }
}

exports.putEmpresa = async (req, res) =>
{
    const {id_empresa, url} = req.body;
    const respuesta  = await sqlServicios.serviceUpdateUrlEmpresas(id_empresa,  url);
    console.log("respuesta en controller ", respuesta);

    if (respuesta == (null||undefined)){
        return res.status(404).json({message: "No se ha podido actualizar la empresa", data: -1} );
    } 
    else {
        res.status(200).json({message:"Empresa actualizada", data: 1});
    }
}
