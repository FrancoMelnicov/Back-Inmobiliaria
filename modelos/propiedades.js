'use strict'

var mongoose = require('mongoose');
var schema = mongoose.Schema;

//este se utilizara como molde para crear nuevas collecciones de propiedades
var PropiedadSchema = schema({
    nombre: String,
    categoria: String,
    ubicacion: String,
    descripcion: String,
    precio: Number,
    imagen: [String]
});

//utilizar el molde en otro lugar
//ACLARACION: mongoDB solo entiende ingles, por ende al poner "Propiedad" este le agregaba solo una "s" y hacia que llegue como "Propiedads" en vez de "Propiedades". Asi que se le puso como "Propiedade" para que llegue con una "s" a la base de datos.
module.exports = mongoose.model('Propiedade', PropiedadSchema)