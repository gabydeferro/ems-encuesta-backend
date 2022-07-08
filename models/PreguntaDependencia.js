const { Schema, mongoose } = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');


const PreguntaDependenciaSchema = Schema({
    pregunta_hija:{
        type: Schema.Types.ObjectId,
        ref: 'Pregunta',
        required: true
    },
    pregunta_madre:{
        type: Schema.Types.ObjectId,
        ref: 'Pregunta',
        required: true
    },
    respuesta_madre:{
        type: Schema.Types.ObjectId,
        ref: 'Respuesta',
        required: true
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
PreguntaDependenciaSchema.plugin(mongoosePaginate);

module.exports = mongoose.models.PreguntaDependencia || mongoose.model('PreguntaDependencia', PreguntaDependenciaSchema);
 