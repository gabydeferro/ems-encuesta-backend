const mongoose = require('mongoose');


const dbConnection = async() => {

    try {

      await mongoose.connect(process.env.DB_CNN);
      console.log('Base de datos conectada')
    } catch (error) {
        
        console.log(error)
        throw new Error (' Fallo la conexion a la base')
    }
}

module.exports = {
    dbConnection
};
