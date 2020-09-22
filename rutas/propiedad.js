'use strict'

var express = require('express');
var PropiedadControlador = require('../controladores/propiedad.js');
//lo que hace esta variable es hacer subir las imagenes a la carpeta uploads
var multipart = require('connect-multiparty');
var multipartMiddleawers = multipart({uploadDir: './uploads'});

var router = express.Router();
router.get('/home', PropiedadControlador.home);
router.post('/test', PropiedadControlador.test);
router.post('/save-propiedad', PropiedadControlador.postPropiedad);
router.get('/propiedad/:id?', PropiedadControlador.getPropiedad);
router.get('/propiedades', PropiedadControlador.getListaPropiedades);
router.put('/propiedad/:id', PropiedadControlador.updatePropiedad);
router.delete('/propiedad/:id', PropiedadControlador.deletePropiedad);
router.post('/upload-imagen/:id', multipartMiddleawers, PropiedadControlador.uploadImagen);
router.get('/getImagen/:imagen', PropiedadControlador.getImagenFile);

module.exports = router;
