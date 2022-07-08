const {Router} = require('express'); 
const router = Router()
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validarCampos');

const { setRespuestaControllerGet, setRespuestaControllerPost, setRespuestaContollerPut, setRespuestaControllerDelete } = require('../controllers/setRespuestaController')

router.get('/',
[
    
] ,
setRespuestaControllerGet
)
router.post('/',
[

],
setRespuestaControllerPost
)

router.put('/:id', 
[

], setRespuestaContollerPut)

router.delete('/:id', 
[

], setRespuestaControllerDelete)

module.exports = router