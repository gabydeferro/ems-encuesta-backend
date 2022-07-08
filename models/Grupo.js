const { Schema, model } = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const GrupoSchema = Schema({
    descripcion_grupo:{
        type: String,
        required: true,
        maxLength: 250
    },
    subtitulo_grupo:{
        type: String,
        maxLength: 250
    },
    n_orden:{
        type: Number,
        maxLength: 3
    },
    n_pagina:{
        type: Number,
        maxLength: 3
    },
    grupo_dependiente:{
        type: Schema.Types.ObjectId,
        ref: 'Grupo'
    },
    habilitado:{
        type: String,
        required: true,
        enum: ['S', 'N'],
        default: 'S'
    },
    creacion_registro:{
        type: Date,
        required: true,
        default: Date.now()
    },
    usuario_creador:{
        type: String
        // required: true
    },
    fecha_actualizacion:{
        type: Date
    },
    usuario_actualizador:{
        type: String
    }
})

GrupoSchema.plugin(mongoosePaginate);

module.exports = model('Grupo', GrupoSchema)