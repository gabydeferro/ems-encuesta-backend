const { Schema, model } = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const SetRespuestaSchema = Schema({
    codigo_set_respuesta:{
        type: Number,
        required: true,
        maxLength: 3
    },
    descripcion_set_respuesta:{
        type: String,
        required: true,
        maxLength: 250
    },
    habilitado:{
        type: String,
        required: true,
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
SetRespuestaSchema.plugin(mongoosePaginate);


module.exports = model('SetRespuesta', SetRespuestaSchema)