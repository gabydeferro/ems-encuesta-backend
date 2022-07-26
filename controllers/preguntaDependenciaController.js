const { response } = require('express')
const PreguntaDependencia = require('../models/preguntadependencia')

const preguntaDependenciaControllerGet = async(req, res = response) => {
    const {pagina = 1, limite = 10} = req.query
    
    // opciones del plugin de paginacion
    const options = {
        page: pagina,
        limit: limite,
        offset: (pagina - 1) * limite,
        select: '_id pregunta_hija pregunta_madre respuesta_madre habilitado',
        populate: [{ path:'pregunta_madre', 
                        select: {descripcion_pregunta: 1, _id: 1}
                    },
                    { path:'respuesta_madre', 
                        select: {descripcion_respuesta: 1, _id: 1}    
                    }
        ],               
        customLabels: {docs: 'preguntaDependencias'} // cambio el nombre de la etiqueta que devuelve los documentos
      }
    
    const {preguntaDependencias} = await PreguntaDependencia.paginate({}, options)
    
    res.json({
        ok: true,
        preguntaDependencias    
    })
}
const preguntaDependenciaControllerPost = async(req, res) => {
    
    const preguntaDependencia = new PreguntaDependencia (req.body)

    try {
        let preguntaDependenciaGuardada = await preguntaDependencia.save()
        const { _id } = preguntaDependenciaGuardada
        preguntaDependenciaGuardada = await PreguntaDependencia.findById (_id)
                                                        .populate({
                                                            path: 'pregunta_madre',
                                                            select:{ descripcion_pregunta:1, _id:1}
                                                        })
                                                        .populate({
                                                            path: 'respuesta_madre',
                                                            select: { descripcion_respuesta:1, _id:1}
                                                        })
        
        res.json({
            ok: true,
            preguntaDependenciaGuardada
        })

    } catch (error) {
        console.log(error)
        res.json({
            ok: false,
            msg: 'Error al grabar en la base, hable con el administrador'
        })
    }
    
}

const preguntaDependenciaContollerPut =  async(req, res = response) => {
    const idPreguntaDependencia = req.params.id
    const preguntaDependenciaUpdate = req.body

    try {
        const preguntaDependencia = await PreguntaDependencia.findById(idPreguntaDependencia)
        if (!preguntaDependencia) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe una preguntaDependencia con ese id en base de datos'
            })
        }
        const preguntaDependenciaActualizada = await PreguntaDependencia.findByIdAndUpdate(idPreguntaDependencia, preguntaDependenciaUpdate, {new: true})
                                                        .populate({
                                                            path: 'pregunta_madre',
                                                            select:{ descripcion_pregunta:1, _id:1}
                                                        })
                                                        .populate({
                                                            path: 'respuesta_madre',
                                                            select: { descripcion_respuesta:1, _id:1}
                                                        })

        res.json({
            ok: true,
            preguntaDependenciaActualizada
        })
    } catch (error) {
        console.log(error) 
        res.status(500).json({
            ok:false,
            msg: 'Error al intentar actualizar preguntaDependencia, hable con el administrador'
        })
    }
}

const preguntaDependenciaControllerDelete = async( req, res = response) => {
        const idPreguntaDependencia = req.params.id
        const {habilitado} = req.body
        
        try {
            const preguntaDependenciaModificado = await PreguntaDependencia.findByIdAndUpdate(idPreguntaDependencia, {'habilitado': habilitado}, {new: true})
                                                            .populate({
                                                                path: 'pregunta_madre',
                                                                select:{ descripcion_pregunta:1, _id:1}
                                                            })
                                                            .populate({
                                                                path: 'respuesta_madre',
                                                                select: { descripcion_respuesta:1, _id:1}
                                                            })
            
            
            res.json({
                ok: true,
                preguntaDependenciaModificado
            })
            
        } catch (error) {
            console.log(error)
            res.status(500).json({
                ok:false,
                msg: 'Error al intentar eliminar preguntaDependencia, hable con el administrador'
            })
        }
}

module.exports = {
    preguntaDependenciaControllerGet,
    preguntaDependenciaControllerPost,
    preguntaDependenciaContollerPut,
    preguntaDependenciaControllerDelete
}