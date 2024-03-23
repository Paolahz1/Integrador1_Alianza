const Router = require("express"); 
const empresasController  = require("../controllers/empresas.controller");
const router = Router();

router 
    .delete("/delete", empresasController.deleteEmpresa)
    .get("/get/all", empresasController.getEmpresas)

module.exports = router; 
