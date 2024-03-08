const {updateTodos, getTodos} = require("../services/todo.services")


exports.todos = async (req, res) =>

{
    
    const {description} = req.body;
    const resUpdate  = await updateTodos(description); 

    console.log(resUpdate);
    if (!resUpdate){
    return res.status(404).json("No se pudo realizar el update");
    } 
    res.status(200).json(resUpdate);

}


exports.todosGet = async (req, res) => {

    const resGetTodos = await getTodos ();  
    console.log( resGetTodos);
    if (!resGetTodos){
        return res.status(404).json("No se pudo obtener la información");
    } 
    res.status(200).json(resGetTodos);
}

