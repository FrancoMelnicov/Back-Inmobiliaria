'use strict'

//para cargar el modulo mongoose
var mongoose = require('mongoose');
var app = require('./app');
var port = 3700;

//https://victorroblesweb.es/2019/10/03/solucionar-problemas-y-avisos-de-mongoose-en-nodejs/
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/inmobiliaria', { useNewUrlParser: true })
        .then(()=> {
            console.log("¡Conexion a la base de datos establecida con exito!");

            //ejecutamos la creacion del servidor
            app.listen(port, ()=> {
                console.log("Servidor corriendo correctamente en el puerto 3700");
            })

        })
        .catch(error => console.log(error));