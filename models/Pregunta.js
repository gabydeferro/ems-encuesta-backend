const { Schema, mongoose } = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');


const PreguntaSchema = Schema({
    descripcion_pregunta:{
        type: String,
        required: true
    },
    subtitulo_pregunta:{
        type: String
    },
    cod_tipo_respuesta:{
        type: Schema.Types.ObjectId,
        ref: 'SetRespuesta',
        required: true
    },
    id_formato_pregunta:{
        type: String,
        required: true,
        enum: ['input', 'radio', 'checkbox', 'select']
    },
    pregunta_dependencia:{
        type: Schema.Types.ObjectId,
        ref: 'PreguntaDependencia',
        required: true
    },
    n_orden:{
        type: Number,
        required: true
    },
    grupo:{
        type: Schema.Types.ObjectId,
        ref: 'Grupo',
        required: true
    },
    obligatoria:{
        type: String
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
PreguntaSchema.plugin(mongoosePaginate);

module.exports = mongoose.models.Pregunta || mongoose.model('Pregunta', PreguntaSchema);
 