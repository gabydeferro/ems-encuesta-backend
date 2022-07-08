const { Schema, model } = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');


const RespuestaSchema = Schema({
    descripcion_respuesta:{
        type: String,
        required: true,
        maxLength: 250
    },
    aclaracion_respuesta:{
        type: String,
        maxLength: 250
    },
    set_respuesta:{
        type: Schema.Types.ObjectId,
        ref: 'SetRespuesta',
        required: true
    },
    deshabilita_respuesta:{
        type: String,
        default: 'N'
    },
    n_orden:{
        type: Number
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
        type: String,
        // required: true
    },
    fecha_actualizacion:{
        type: Date
    },
    usuario_actualizador:{
        type: String
    }
})
RespuestaSchema.plugin(mongoosePaginate);


module.exports = model('Respuesta', RespuestaSchema)