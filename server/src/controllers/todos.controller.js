const todoServices = require("../services/todo.services.js")


exports.todos = async (req, res) =>

{
    
    const {description} = req.body;
    const resUpdate  = await todoServices.updateTodos(description); 
    console.log("Respuesta en servidor " , resUpdate);
    if (!resUpdate){
    return res.status(404).json("No se pudo realizar el update");
    } 
    res.status(200).json(resUpdate);

}


exports.todosGet = async (req, res) => {

    const resGetTodos = await todoServices.getTodos ();  
    console.log( resGetTodos);
    if (!resGetTodos){
        return res.status(404).json("No se pudo obtener la información");
    } 
    res.status(200).json(resGetTodos);
}

