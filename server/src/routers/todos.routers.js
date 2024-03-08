const Router = require("express"); 
const router = Router();
const { todos, todosGet } = require('../controllers/todos.controller')

router 
    .post ('/', todos)
    .get('/obtener/facil', todosGet)

module.exports = router;

