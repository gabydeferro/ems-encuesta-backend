const { response } = require('express')
const Respuesta = require('../models/respuesta')

const respuestaControllerGet = async(req, res = response) => {
    const {pagina = 1, limite = 10} = req.query
    
    // opciones del plugin de paginacion
    const options = {
        page: pagina,
        limit: limite,
        offset: (pagina - 1) * limite,
        // select: '_id descripcion_respuesta set_respuesta n_orden habilitado',
        populate: { 
            path:'set_respuesta', 
            select: {
                descripcion_set_respuesta: 1,
                _id: 1
            }
        },
        sort: 'n_orden',
        customLabels: {docs: 'respuestas'} // cambio el nombre de la etiqueta que devuelve los documentos
      }
    
    const {respuestas, ...paginacion} = await Respuesta.paginate({}, options)
    const ultimaRespuesta = await Respuesta.find().sort({'n_orden': -1}).limit(1)
    const ultimoNOrden = ultimaRespuesta[0]?.n_orden || 0
    
    res.json({
        ok: true,
        respuestas,
        paginacion,
        ultimoNOrden
    })
}
const respuestaControllerPost = async(req, res) => {    
    const respuesta = new Respuesta (req.body)
    try {
        let respuestaGuardada = await respuesta.save()
        const { _id } = respuestaGuardada
        respuestaGuardada = await Respuesta
        .findById(_id)
        .populate({ 
            path:'set_respuesta', 
            select: {descripcion_set_respuesta: 1, _id: 1}
        })

        res.json({
            ok: true,
            respuestaGuardada
        })

    } catch (error) {
        console.log(error)
        res.json({
            ok: false,
            msg: 'Error al grabar en la base, hable con el administrador'
        })
    }
    
}

const respuestaContollerPut =  async(req, res = response) => {
    const idRespuesta = req.params.id
    const respuestaUpdate = req.body

    try {
        const respuesta = await Respuesta.findById(idRespuesta)
        if (!respuesta) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe una respuesta con ese id en base de datos'
            })
        }
        const valor = await Respuesta.replaceOne({_id: idRespuesta}, respuestaUpdate, {new: true})
        if (valor.modifiedCount) {
            const respuestaActualizada = await Respuesta
            .findById(idRespuesta)
            .populate({ 
                path:'set_respuesta', 
                select: {descripcion_set_respuesta: 1,  _id: 1}
            })   
            res.json({
                ok: true,
                respuestaActualizada
            })
        }
    } catch (error) {
        console.log(error) 
        res.status(500).json({
            ok:false,
            msg: 'Error al intentar actualizar respuesta, hable con el administrador'
        })
    }
}

const respuestaControllerDelete = async( req, res = response) => {
        const idRespuesta = req.params.id
        const {habilitado} = req.body
        
        try {
            const respuestaModificada = await Respuesta
            .findByIdAndUpdate(idRespuesta, {'habilitado': habilitado}, {new: true})
            .populate({ 
                path:'set_respuesta', 
                select: {descripcion_set_respuesta: 1, _id: 1}
            })

            res.json({
                ok: true,
                respuestaModificada
            })
            
        } catch (error) {
            console.log(error)
            res.status(500).json({
                ok:false,
                msg: 'Error al intentar eliminar respuesta, hable con el administrador'
            })
        }
}

module.exports = {
    respuestaControllerGet,
    respuestaControllerPost,
    respuestaContollerPut,
    respuestaControllerDelete
}