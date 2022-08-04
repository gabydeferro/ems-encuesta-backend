const { response } = require('express')
const Grupo = require('../models/grupo')

const grupoControllerGet = async(req, res = response) => {
    const {pagina = 1, limite = 10} = req.query
    
    // opciones del plugin de paginacion
    const options = {
        page: pagina,
        limit: limite,
        offset: (pagina - 1) * limite,
        select: '_id descripcion_grupo subtitulo_grupo grupo_dependiente n_orden n_pagina habilitado',
        populate: { path:'grupo_dependiente', 
                    select: {
                        descripcion_grupo: 1,
                        _id: 1
                    }
                },
        sort: 'n_orden',
        customLabels: {docs: 'grupos'} // cambio el nombre de la etiqueta que devuelve los documentos
      }
    
    const {grupos, ...paginacion} = await Grupo.paginate({}, options)
    const ultimoGrupo = await Grupo.find().sort({'n_orden': -1}).limit(1)
    const ultimoNOrden = ultimoGrupo[0]?.n_orden || 0
     
    res.json({
        ok: true,
        grupos,
        paginacion,
        ultimoNOrden
    })
}
const grupoControllerPost = async(req, res) => {
    const grupo = new Grupo (req.body)

    try {
        let grupoGuardado = await grupo.save()
        const {_id } = grupoGuardado
        grupoGuardado = await Grupo
        .findById(_id)
        .populate({ 
            path:'grupo_dependiente', 
            select: {descripcion_grupo: 1, _id: 1},
        })
        
        res.json({
            ok: true,
            grupoGuardado
        })

    } catch (error) {
        console.log(error)
        res.json({
            ok: false,
            msg: 'Error al grabar en la base, hable con el administrador'
        })
    }
    
}

const grupoContollerPut =  async(req, res = response) => {
    const idGrupo = req.params.id
    const grupoUpdate = req.body
    try {
        const grupo = await Grupo.findById(idGrupo)
        if (!grupo) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe un grupo con ese id en base de datos'
            })
        }
        const valor = await Grupo.replaceOne({_id: idGrupo}, grupoUpdate, {new: true})
        //chequea si efectivamente se reemplazo un documento        
        if (valor.modifiedCount) {
            const grupoActualizado = await Grupo
            .findById(idGrupo)
            .populate({ 
                path:'grupo_dependiente', 
                select: {descripcion_grupo: 1, _id: 1},
            })

            res.json({
                ok: true,
                grupoActualizado
            })
            
        }                                   
    } catch (error) {
        console.log(error) 
        res.status(500).json({
            ok:false,
            msg: 'Error al intentar actualizar grupo, hable con el administrador'
        })
    }
}

const grupoControllerDelete = async( req, res = response) => {
        const idGrupo = req.params.id
        const {habilitado} = req.body
        
        try {
            const grupoModificado = await Grupo
            .findByIdAndUpdate(idGrupo, {'habilitado': habilitado}, {new: true})
            .populate({ 
                path:'grupo_dependiente', 
                select: {descripcion_grupo: 1, _id: 1},
            })
            
            res.json({
                ok: true,
                grupoModificado
            })
            
        } catch (error) {
            console.log(error)
            res.status(500).json({
                ok:false,
                msg: 'Error al intentar eliminar grupo, hable con el administrador'
            })
        }
}

module.exports = {
    grupoControllerGet,
    grupoControllerPost,
    grupoContollerPut,
    grupoControllerDelete
}