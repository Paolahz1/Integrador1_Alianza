const Router = require("express"); 
const productosController  = require("../controllers/productos.controller");
const router = Router();

router

    .get("/get/all", productosController.getAllProductos)
    .get("/get/:id_emp", productosController.getProductosByEmpresa)
    
module.exports = router;

