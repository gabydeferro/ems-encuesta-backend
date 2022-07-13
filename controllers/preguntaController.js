const { response } = require('express')
const Pregunta = require('../models/Pregunta')
const PreguntaDependencia = require('../models/PreguntaDependencia')


const preguntaControllerGet = async(req, res = response) => {
    const {pagina = 1, limite = 10} = req.query
    
    // opciones del plugin de paginacion
    const options = {
        page: pagina,
        limit: limite,
        offset: (pagina - 1) * limite,
        select: '_id descripcion_pregunta cod_tipo_respuesta subtitulo_pregunta grupo n_orden  habilitado',
        populate: [{ path:'cod_tipo_respuesta', 
                        select: {descripcion_set_respuesta: 1, _id: 1}
                    },
                    { path:'grupo', 
                        select: {descripcion_grupo: 1, _id: 1}    
                    },
                    { path: 'pregunta_dependencia',
                        select: { pregunta_madre: 1, respuesta_madre: 1, _id: 1}
                    }
        ],
        sort: 'n_orden',
        customLabels: {docs: 'preguntas'} // cambio el nombre de la etiqueta que devuelve los documentos
      }

    
    const {preguntas, ...paginacion} = await Pregunta.paginate({}, options)
    const ultimaPregunta = await Pregunta.find().sort({'n_orden': -1}).limit(1)
    const ultimoNOrden = ultimaPregunta[0]?.n_orden || 0
      
    res.json({
        ok: true,
        preguntas,
        paginacion,
        ultimoNOrden
    })
}
const preguntaControllerPost = async(req, res) => {
    
    const pregunta = new Pregunta (req.body)
    try {
        if (req.body.pregunta_madre) {
            const { pregunta_madre, respuesta_madre} = req.body
            const pregunta_hija = pregunta._id
            const preguntaDependiente = new PreguntaDependencia ({pregunta_hija, pregunta_madre, respuesta_madre, habiltado : 'S'})
            let preguntaDependienteGuardada = await preguntaDependiente.save()
            pregunta.pregunta_dependencia = preguntaDependienteGuardada._id      
        }
        let preguntaGuardada = await pregunta.save()
        const {_id } = preguntaGuardada
        preguntaGuardada = await Pregunta.findById(_id)
                                        .populate({ path:'cod_tipo_respuesta', 
                                        select: {descripcion_set_respuesta: 1, _id: 1}
                                        })
                                        .populate({ path:'grupo', 
                                                select: {descripcion_grupo: 1, _id: 1}
                                        })
                                        .populate({ path: 'pregunta_dependencia',
                                                select: { pregunta_madre: 1, respuesta_madre: 1, _id: 1}
                                        })
        
        res.json({
            ok: true,
            preguntaGuardada
        })

    } catch (error) {
        console.log(error)
        res.json({
            ok: false,
            msg: 'Error al grabar en la base, hable con el administrador'
        })
    }
    
}

const preguntaContollerPut =  async(req, res = response) => {
    const idPregunta = req.params.id
    const preguntaUpdate = req.body

    try {
        const pregunta = await Pregunta.findById(idPregunta)
        if (!pregunta) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe una pregunta con ese id en base de datos'
            })
        }
        const valor = await Pregunta.replaceOne({_id: idPregunta}, preguntaUpdate, {new: true})
        if (valor.modifiedCount) {
            const preguntaActualizada = await Pregunta.findById(idPregunta)
                                                        .populate({ path:'cod_tipo_respuesta', 
                                                                    select: {descripcion_set_respuesta: 1, _id: 1}
                                                        })
                                                        .populate({ path:'grupo', 
                                                                    select: {descripcion_grupo: 1, _id: 1}
                                                        })
    
            res.json({
                ok: true,
                preguntaActualizada
            })
            
        }
    } catch (error) {
        console.log(error) 
        res.status(500).json({
            ok:false,
            msg: 'Error al intentar actualizar Pregunta, hable con el administrador'
        })
    }
}

const preguntaControllerDelete = async( req, res = response) => {
        const idPregunta = req.params.id
        const {habilitado} = req.body
        
        try {
            const preguntaModificada = await Pregunta.findByIdAndUpdate(idPregunta, {'habilitado': habilitado}, {new: true})
                                                    .populate({ path:'cod_tipo_respuesta', 
                                                                select: {descripcion_set_respuesta: 1, _id: 1}
                                                    })
                                                    .populate({ path:'grupo', 
                                                                select: {descripcion_grupo: 1, _id: 1}
                                                    })
            res.json({
                ok: true,
                preguntaModificada
            })
            
        } catch (error) {
            console.log(error)
            res.status(500).json({
                ok:false,
                msg: 'Error al intentar eliminar pregunta, hable con el administrador'
            })
        }
}

module.exports = {
    preguntaControllerGet,
    preguntaControllerPost,
    preguntaContollerPut,
    preguntaControllerDelete
}