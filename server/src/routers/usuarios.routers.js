const Router = require("express"); 
const usuariosController  = require("../controllers/usuarios.controller");
const router = Router();

router 
    .delete ("/delete", usuariosController.deletUser)
    .get("/existe", usuariosController.getUsurioExiste) 
    module.exports = router;


    