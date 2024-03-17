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
    const resultado  = await sqlServicios.serviceUsuarioExiste(identificacion); 
    if (!resultado){
        return res.status(404).json("No se ha encontrado el usuario");
    } 
    res.status(200).json(resultado);
}

exports.registrarUsuario= async (req, res) =>
{
    const {tipo_usuario, nombre, email, telefono, tipo_documento, documento, nombre_usuario, contrasena} = req.body;
    const resultado  = await sqlServicios.serviceInsertUsuario(tipo_usuario, nombre, email, telefono, tipo_documento, documento, nombre_usuario, contrasena); 
    
    if (resultado == null){
        return res.status(404).json({ error: "No se ha podido realizar la operación" });
    }
    if(resultado == 1){
        res.status(200).json({message: "Nombre de usuario existente", data: resultado})
    }
    else{
        res.status(200).json({ message: "Usuario registrado exitosamente.", data: resultado });
    }
}


exports.autenticarUsuario= async (req, res) =>
{
    const {username,password} = req.body;
    const resultado  = await sqlServicios.serviceAutenticarUsuario(username, password);
    
    console.log ("Respuesta en usuarios.controller", resultado);

    if (resultado == null){
        return res.status(404).json({ error: "No se ha podido realizar la operación" });
    }
    if(resultado == 2){
        res.status(200).json({message: "Contraseña incorrecta", data: resultado})
    }
    else if ( resultado == 1){
        res.status(200).json( {message: "Login exitoso", data: resultado} );
    }
    else if( resultado == 0){
        res.status(200).json({message: "Usuario no encontrado", data: resultado})
    }
}
