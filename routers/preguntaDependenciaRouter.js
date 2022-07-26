const {Router} = require('express'); 
const router = Router()
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validarCampos');

const { preguntaDependenciaControllerGet,
    preguntaDependenciaControllerPost,
    preguntaDependenciaContollerPut,
    preguntaDependenciaControllerDelete } = require('../controllers/preguntaDependenciaController')

router.get('/',
[
    
] ,
preguntaDependenciaControllerGet
)
router.post('/',
[

],
preguntaDependenciaControllerPost
)

router.put('/:id', 
[

], preguntaDependenciaContollerPut)

router.delete('/:id', 
[

], preguntaDependenciaControllerDelete)

module.exports = router