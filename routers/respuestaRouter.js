const {Router} = require('express'); 
const router = Router()
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validarCampos');

const { respuestaControllerGet, respuestaControllerPost, respuestaContollerPut, respuestaControllerDelete } = require('../controllers/respuestaController')

router.get('/',
[
    
] ,
respuestaControllerGet
)
router.post('/',
[

],
respuestaControllerPost
)

router.put('/:id', 
[

], respuestaContollerPut)

router.delete('/:id', 
[

], respuestaControllerDelete)

module.exports = router