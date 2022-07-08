const {Router} = require('express'); 
const router = Router()
const { busquedaControllerGet } = require('../controllers/busquedaController');

router.get('/',
[
    
] ,
busquedaControllerGet
)

module.exports = router