const sqlServicios = require ("../services/empresas.services")


exports.deleteEmpresa = async (req, res) =>
{
    const {id_empresa} = req.body;
    const resDelete  = await sqlServicios.serviceDeleteEmpresa(id_empresa);
    console.log("respuesta en controller ", resDelete);

    if (resDelete == (null||undefined)){
    return res.status(404).json("No se ha podido eliminar la empresa");
    } 
    if (resDelete == 0){
    res.status(200).json("Empresa no encontrada");

    }
    else {
        res.status(200).json("Empresa eliminada");
    }
}


exports.getEmpresas = async (req, res) =>
{
    try {
        const empresas = await sqlServicios.serviceGetEmpresas();
        if (!empresas || empresas.length === 0) {
            return res.status(404).json({ error: 'No se encontraron empresas' });
        }
        res.status(200).json({ empresas });
    } catch (error) {
        console.error('Error al obtener empresas:', error);
        res.status(500).json({ error: 'Error en el servidor' });
    }
}

