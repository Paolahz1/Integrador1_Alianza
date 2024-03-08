const { postUser } = require ("../services/user.Services")

exports.postUser = async (req, res) => {
    
    const {nombre} = req.body;
    const postPersona = await postUser(nombre);
    console.log(postPersona);

    if (!postPersona){
    return res.status(404).json("No se pudo realizar la insercción");
    } 
    res.status(200).json(postPersona);

}

