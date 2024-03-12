const Router = require("express"); 
const router = Router();
const todoControllers = require('../controllers/todos.controller')

router 
    .post ('/', todoControllers.todos)
    .get('/obtener/facil', todoControllers.todosGet)

module.exports = router;

