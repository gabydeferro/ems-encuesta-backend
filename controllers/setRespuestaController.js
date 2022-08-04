const { response } = require('express')
const SetRespuesta = require('../models/setrespuesta')

const setRespuestaControllerGet = async(req, res = response) => {
    const {pagina = 1, limite = 10} = req.query
    
    // opciones del plugin de paginacion
    const options = {
        page: pagina,
        limit: limite,
        offset: (pagina - 1) * limite,               
        customLabels: {docs: 'setRespuestas'} // cambio el nombre de la etiqueta que devuelve los documentos
      }
    
    const {setRespuestas, ...paginacion} = await SetRespuesta.paginate({}, options)
    const ultimoSetRespuesta = await SetRespuesta.find().sort({'codigo_set_respuesta': -1}).limit(1)
    const ultimoSet = ultimoSetRespuesta[0]?.codigo_set_respuesta || 1
    
    res.json({
        ok: true,
        setRespuestas,
        paginacion,
        ultimoSet
    })
}
const setRespuestaControllerPost = async(req, res) => {
    
    const setRespuesta = new SetRespuesta (req.body)

    try {
        const setRespuestaGuardado = await setRespuesta.save()
        res.json({
            ok: true,
            setRespuestaGuardado
        })

    } catch (error) {
        console.log(error)
        res.json({
            ok: false,
            msg: 'Error al grabar en la base, hable con el administrador'
        })
    }
    
}

const setRespuestaContollerPut =  async(req, res = response) => {
    const idSetRespuesta = req.params.id
    const setRespuestaUpdate = req.body

    try {
        const setRespuesta = await SetRespuesta.findById(idSetRespuesta)
        if (!setRespuesta) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe un setRespuesta con ese id en base de datos'
            })
        }
        const setRespuestaActualizado = await SetRespuesta.findByIdAndUpdate(idSetRespuesta, setRespuestaUpdate, {new: true})

        res.json({
            ok: true,
            setRespuestaActualizado
        })
    } catch (error) {
        console.log(error) 
        res.status(500).json({
            ok:false,
            msg: 'Error al intentar actualizar setRespuesta, hable con el administrador'
        })
    }
}

const setRespuestaControllerDelete = async( req, res = response) => {
        const idSetRespuesta = req.params.id
        const {habilitado} = req.body
        
        try {
            const setRespuestaModificado = await SetRespuesta.findByIdAndUpdate(idSetRespuesta, {'habilitado': habilitado}, {new: true})
            
            res.json({
                ok: true,
                setRespuestaModificado
            })
            
        } catch (error) {
            console.log(error)
            res.status(500).json({
                ok:false,
                msg: 'Error al intentar eliminar setRespuesta, hable con el administrador'
            })
        }
}

module.exports = {
    setRespuestaControllerGet,
    setRespuestaControllerPost,
    setRespuestaContollerPut,
    setRespuestaControllerDelete
}