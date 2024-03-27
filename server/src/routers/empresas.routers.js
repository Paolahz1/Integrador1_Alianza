const Router = require("express"); 
const empresasController  = require("../controllers/empresas.controller");
const router = Router();

router 
    .delete("/delete", empresasController.deleteEmpresa)
    .get("/getAll", empresasController.getEmpresas)
    .post("/create", empresasController.postEmpresa)
    .put("/update", empresasController.updateEmpresa)
module.exports = router; 
