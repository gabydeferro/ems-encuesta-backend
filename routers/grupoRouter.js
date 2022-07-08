const {Router} = require('express'); 
const router = Router()
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validarCampos');

const { grupoControllerGet, grupoControllerPost, grupoContollerPut, grupoControllerDelete } = require('../controllers/grupoController')

router.get('/',
[
    
] ,
grupoControllerGet
)
router.post('/',
[

],
grupoControllerPost
)

router.put('/:id', 
[

], grupoContollerPut)

router.delete('/:id', 
[

], grupoControllerDelete)

module.exports = router