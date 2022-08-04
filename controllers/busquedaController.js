const { response } = require('express')
const Grupo = require('../models/grupo')
const Pregunta = require('../models/pregunta')
const Respuesta = require('../models/respuesta')
const SetRespuesta = require('../models/setrespuesta')

const pagina = 1, limite = 10

const busquedaControllerGet = async(req, res = response) => {
    
    let { coleccion } = req.query
    let query = {}
    let options = {
        page: pagina,
        limit: limite,
        offset: (pagina - 1) * limite  
    } 
    
    switch (coleccion) {
        case 'grupos':
            let { estadoGrupo = 'S', grupoBusq = '', grupoDep = '' } = req.query
            if (estadoGrupo !== '') {
                query.habilitado = estadoGrupo
            }
            if (grupoBusq !== '') {
                query._id = grupoBusq    
            }
            grupoDep = (  grupoDep === '') ? null : grupoDep
            if (grupoDep!== null) {
                query.grupo_dependiente = grupoDep
            }
            options.select = '_id descripcion_grupo subtitulo_grupo grupo_dependiente n_orden n_pagina habilitado'
            options.populate = {    
                path:'grupo_dependiente', 
                select: {
                    descripcion_grupo: 1,
                    _id: 1
                }
            }
            options.customLabels = {docs: 'grupos'} // cambio el nombre de la etiqueta que devuelve los documentos
            const {grupos, ...paginacionGrupo} = await Grupo.paginate(query, options)
            
            res.json({
                ok: true,
                grupos,
                paginacion: paginacionGrupo
            })
            break;
        case 'preguntas':
            let { estadoPregunta = 'S', preguntaBusq = '', grupoBusqPreg = '' } = req.query
            if (estadoPregunta !== '') {
                query.habilitado = estadoPregunta
            }
            if (preguntaBusq !== '') {
                query._id = preguntaBusq    
            }
            if (grupoBusqPreg !== '') {
                query.grupo = grupoBusqPreg    
            }
            
            options.select = '_id descripcion_pregunta cod_tipo_respuesta subtitulo_pregunta grupo n_orden  habilitado'
            options.populate = [
                { 
                path:'cod_tipo_respuesta', 
                select: {descripcion_set_respuesta: 1, _id: 1}
                },
                { 
                path:'grupo', 
                select: {descripcion_grupo: 1, _id: 1}    
                }
            ]
            options.customLabels = {docs: 'preguntas'} // cambio el nombre de la etiqueta que devuelve los documentos
            const {preguntas, ...paginacionPregunta} = await Pregunta.paginate(query, options)
            
            res.json({
                ok: true,
                preguntas,
                paginacion: paginacionPregunta
            })
            break;
        case 'respuestas':
            let { estadoRespuesta = 'S', respuestaBusq = '', setRespuesta_busq = '' } = req.query
            if (estadoRespuesta !== '') {
                query.habilitado = estadoRespuesta
            }
            if (respuestaBusq !== '') {
                query._id = respuestaBusq    
            }
            if (setRespuesta_busq !== '') {
                query.set_respuesta = setRespuesta_busq    
            }
            delete options.select 
            options.populate = { 
                path:'set_respuesta', 
                select: {
                    descripcion_set_respuesta: 1,
                    _id: 1
                }
            }
            options.customLabels = {docs: 'respuestas'} // cambio el nombre de la etiqueta que devuelve los documentos
            const {respuestas, ...paginacionRespuesta} = await Respuesta.paginate(query, options)
            
            res.json({
                ok: true,
                respuestas,
                paginacion: paginacionRespuesta
            })
            break;
        case 'setrespuestas':
            const { estadoSetRespuesta = 'S', setRespuestaBusq = '', respuesta_busq = ''} = req.query
            let respuesta
            if (estadoSetRespuesta !== '') {
                query.habilitado = estadoSetRespuesta
            }
            if (setRespuestaBusq !== '') {
                query._id = setRespuestaBusq    
            }
            if (respuesta_busq !== '') {
                let optionsResp = {
                    page: pagina,
                    limit: limite,
                    offset: (pagina - 1) * limite,
                    customLabels : {docs: 'respuestas'}  
                  }
               const {respuestas} =   await Respuesta.paginate({_id: respuesta_busq }, optionsResp)
               query._id = respuestas[0].set_respuesta
               
            }
            delete options.select, options.populate
            options.customLabels = {docs: 'setRespuestas'}

            let { setRespuestas, ...paginacionSetRespuesta} = await SetRespuesta.paginate(query, options)

            res.json({
                ok: true,
                setRespuestas,
                paginacion: paginacionSetRespuesta
            })
            break;
    
        default: 'error de busqueda'
            break;
    }
         
   
}

module.exports = {
    busquedaControllerGet
};
