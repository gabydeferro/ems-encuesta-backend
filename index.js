const express = require('express'); 
require('dotenv').config()
const cors = require('cors');
const app = express()
const { dbConnection } = require('./database/dbConnection')


const port = process.env.PORT || 4001

app.use(cors())

app.use(express.static('public'))
app.use(express.json())

dbConnection()


app.use('/controllers/grupo', require('./routers/grupoRouter'))
app.use('/controllers/pregunta', require('./routers/preguntaRouter'))
app.use('/controllers/respuesta', require('./routers/respuestaRouter'))
app.use('/controllers/setrespuesta', require('./routers/setrespuestaRouter'))
app.use('/controllers/busqueda', require('./routers/busquedaRouter'))

app.listen ( port, () => {
    console.log(`Servidor corriendo en el puerto ${port}`)

})