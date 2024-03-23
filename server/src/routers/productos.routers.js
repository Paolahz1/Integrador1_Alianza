const Router = require("express"); 
const productosController  = require("../controllers/productos.controller");
const router = Router();

router 
    .get("/obtener/metales/", productosController.getProductos)
module.exports = router;

