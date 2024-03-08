const Router = require("express"); 
const router = Router();
const { postUser } = require('../controllers/user.controller')

router 
    .get('/', postUser)
    
module.exports = router;
