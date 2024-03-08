const express = require("express");
const app = express();
const cors = require("cors");
const todosRouter = require ("../server/src/routers/todos.routers"); 
const userRouter = require("../server/src/routers/user.routers");

//middleware
app.use(cors('*'));
app.use(express.json());

//ROUTES//
app.use("/todos", todosRouter);
app.use("/user", userRouter);


app.listen(5000, () => {
    console.log("server has started on port 5000")
}); 


/*
NOTA: Lanza el servicio desde la terminal (estando dentro de la carpeta service) con el comando nodemon index 
*/ 


/* 
NOTA: Lo siguiente era como lo hacía antes, pero no lo vamos a hacer así porque no es modular 
ya que todo lo hace en un solo lugar: Obtención de datos de la api,
envío de los datos obtenidos a la base de datos, obtención de la respuesta de la base de
datos

Lo dejo ahí porque no afecta las consultas, todas las consultas que mandemos por POSTMAN las 
"atrapa" o gestiona el app.use de arriba 
*/

app.post("/todos", async(req, res) =>{
    try {
        const {description}= req.body;
        const newTodo = await pool.query (
            "INSERT INTO todo (description) VALUES ($1) RETURNING *",
            [description]
        );
        res.json(newTodo.rows[0]);
    } catch (error) {
        console.error(error.message);
    }
});

//get all todos

app.post ("/todos/obtener", async(req, res) => {

    try {
        const {nombre_tabla} = req.body;
        const allTodos = await pool.query
        ('SELECT * FROM obtenerTodosLosDatos($1)AS (col1 integer, col2 VARCHAR)', [nombre_tabla]);
        res.json(allTodos.rows)
    } catch (error) {
        console.error(error.message);
    }
});


app.get ("/todos/obtener/facil", async(req, res) => {

    try {

        const allTodos = await pool.query
        ('SELECT * FROM todo');
        res.json(allTodos.rows)
    } catch (error) {
        console.error(error.message);
    }
});


//get a todo 

app.get("/todos/:id", async (req, res) =>{

    try {
        const {id} = req.params;
        const todo = await pool.query('SELECT * FROM todo WHERE todo_id = $1', [id]);
        res.json(todo.rows);
    } catch (error) {
        console.error(error.message);
    }
});

//update a todo

app.put("/todos/:id", async(req, res) =>{
    try {
        const {id} = req.params;
        const {description} = req.body;
        const updateTodo = await pool.query ('UPDATE todo SET description = $1 WHERE todo_id = $2', [description, id]);
        res.json("Se ha actualizado!"); 
    } catch (error) {
        console.error(error.message);
    }
});


//delete a todo
app.delete("/todos/delete/:id", async(req, res) => {
    try {
        const {id} = req.params;
        const deleteTodo = await pool.query("DELETE FROM todo WHERE todo_id = $1", [id]);  
        res.json("Se ha eliminado!");
    } catch (error) {
        console.error(error.message);
    }

});
