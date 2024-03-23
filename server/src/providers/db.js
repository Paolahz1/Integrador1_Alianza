const {Pool} = require("pg"); 
/*  se utiliza la destructuración 
para extraer directamente la clase Pool
del objeto exportado por el módulo pg.*/

const pool = new Pool({
    user: "postgres",
    password: "1234",
    host: "localhost",
    port: 5432,
    database: "perntodo"
})
/* Se crea una instancia del objeto Pool 
con la configuración proporcionada y 
se exporta esa instancia. */

module.exports = pool;

