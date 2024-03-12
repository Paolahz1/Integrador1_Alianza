const pool = require ("../providers/db"); 

async function updateTodos(description) {

    try {
        const newTodo = await pool.query (
            "INSERT INTO todo (description) VALUES ($1) RETURNING *",
            [description]
        );
        console.log(newTodo.rows[0]);
        return newTodo.rows[0];
    } catch (error) {
        console.error(error.message);
        return null;
    }

}

async function getTodos (){

    try {
        const allTodos = await pool.query
        ('SELECT * FROM todo');
        return allTodos.rows
    } catch (error) {
        console.error(error.messaWge);
    }

}



module.exports = {
    updateTodos,
    getTodos,
};

