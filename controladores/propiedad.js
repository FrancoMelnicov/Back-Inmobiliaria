'use strict'

//cargamos el modelo de Propiedad para su utilizacion
var Propiedad = require('../modelos/propiedades');
const propiedades = require('../modelos/propiedades');
var filesistem = require('fs');
var path = require('path');

var controller = {
    home: function(req, res){
        return res.status(200).send({
            message: 'Soy home'
        });
    },
    
    test: function(req, res){
        return res.status(200).send({
            message: 'Soy test'
        });
    },

    postPropiedad: function(req, res) {
        let propiedad = new Propiedad();

        let parametros = req.body;
        propiedad.nombre = parametros.nombre;
        propiedad.ubicacion = parametros.ubicacion;
        propiedad.descripcion = parametros.descripcion;
        propiedad.precio = parametros.precio;
        propiedad.imagen = null;

        propiedad.save((err, propiedadStored) => {
            if(err) return res.status(500).send({message: "Error al guardar"});
            if(!propiedadStored) return res.status(404).send({message: "No se a podido guardar"});

            return res.status(200).send({propiedad: propiedadStored});
        });
    },

    getPropiedad: function(req, res) {
        let propiedadId = req.params.id;
        Propiedad.findById(propiedadId, (err, propiedad) => {
            if (propiedadId == null) return res.status(404).send({message: "El documento no existe."})
            if(err) return res.status(500).send({message: "Error al devolver los datos."});
            if(!propiedad) return res.status(404).send({message: "El documentos no existe."});

            return res.status(200).send({
                propiedad
            });
        })
    },

    getListaPropiedades: function(req, res) {
        Propiedad.find({}).exec((err, propiedades) => {
            if(err) return res.status(500).send({message: "Error al devolver los datos."});
            if(!propiedades) return res.status(404).send({message: "No hay propiedades a mostrar."});

            return res.status(200).send({propiedades});
        })
    },

    updatePropiedad: function(req, res) {
        let propiedadId = req.param.id;
        var update = req.body;

        //sin {new: true} no funciona el metodo. 
        Propiedad.findOneAndUpdate(propiedadId, update, {new: true}, (err, propiedadUpdate) =>{
            if(err) return res.status(500).send({message: "Error al actualizar."});
            if(!propiedadUpdate) return res.status(404).send({message: "No existe esa propiedad."});

            return res.status(200).send({
                propiedad: propiedadUpdate
            });
        });
    },

    deletePropiedad: function(req, res) {
        let propiedadId = req.params.id;

        Propiedad.findOneAndRemove(propiedadId, (err, propiedadDelete) => {
            if(err) return res.status(500).send({message: "No se pudo borrar la propiedad"});
            if(!propiedadDelete) return res.status(404).send({message: "La propiedad no existe."});

            return res.status(200).send({
                propiedad: propiedadDelete
            });
        })
    },

    uploadImagen: function(req, res) {
        let propiedadId = req.params.id;
        let fileName = "Imágen no subida...";

        if(req.files){
            //de la peticion para guardar la imagen extraemos el nombre de esta para agregarla luego en la propiedad a actualizar
            let filePath = req.files.imagen.path;
            let fileSplit = filePath.split('\\');
            let fileName = fileSplit[1];
            let extSplit = fileName.split('\.');
            let fileExt = extSplit[1];

            //verificamos que la imagen cumpla con las propiedades de la condicion. Caso contrario este ni se guardara en uploads ni se subira a la base de datos
            if (fileExt == 'png' || fileExt == 'jpg' || fileExt == 'jpeg' || fileExt == 'gif') {
                //buscamos por id la propiedad en la base de datos y le asignamos la imagen
                Propiedad.findByIdAndUpdate(propiedadId, {imagen: fileName}, {new: true}, (err, propiedadUpdate) => {
                    if (err) return res.status(500).send({message: "La imagen no se subio"});
                    if (!propiedadUpdate) return res.status(404).send({message: "La propiedad no existe"});
                    
                    return res.status(200).send({
                        files: propiedadUpdate
                    });
                })
            } else {
                filesistem(filePath, (err) => {
                    return res.status(200).send({message: "La extension no es valida"});
                });
            };

        } else {
            return res.status(200).send({
                message: fileName
            });
        }
    },

    getImagenFile: function(req, res){
        let file = req.params.imagen;
        let path_file = './uploads/' + file;
        
        filesistem.exists(path_file, (exists) => {
            if(exists) {
                return res.sendFile(path.resolve(path_file));
            } else {
                return res.status(200).send({
                    message: "No existe la imagen..."
                })
            }
        });
    }
};

module.exports = controller;