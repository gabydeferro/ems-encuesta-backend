const {Router} = require('express'); 
const router = Router()
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validarCampos');

const { preguntaControllerGet, preguntaControllerPost, preguntaContollerPut, preguntaControllerDelete } = require('../controllers/preguntaController')

router.get('/',
[
    
] ,
preguntaControllerGet
)
router.post('/',
[

],
preguntaControllerPost
)

router.put('/:id', 
[

], preguntaContollerPut)

router.delete('/:id', 
[

], preguntaControllerDelete)

module.exports = router