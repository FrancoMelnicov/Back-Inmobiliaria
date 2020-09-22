'use strict'

//llamamos a los modulos para utilizarlos
var express = require('express');
var bodyParser = require('body-parser');
var app = express();

//cargamos archivos rutas
var rutasPropiedad = require('./rutas/propiedad')

//middleawers: (capa que se ejecuta antes de realizar una funcionalidad de una peticion)
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());


//cors
// configurar cabeceras http
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
 
    next();
});



//creamos las rutas
app.use('/api', rutasPropiedad);

//exportamos
module.exports = app;
