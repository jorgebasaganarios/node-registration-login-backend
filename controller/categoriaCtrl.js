/*

    Controlador de categoría

*/

'use strict'
const categoriaModel = require('../model/categoriaModel');

//Crear una categoría
let categoriaCrear = (req, res, next) => {
    categoriaModel.create(req.body)
        .then((response) => {
            console.log(response);
            res.status(200).send(response);
        })
        .catch(next);
}

//Mostrar todas las categorías
let categoriaBuscar = (req, res) => {
    categoriaModel.find()
        .then(Categorias => {
            res.send(Categorias);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Se produjo un error al intentar recuperar la categoría."
            });
        });
};

//Buscar una categoría por Id
let categoriaBuscarUna = (req, res) => {
    categoriaModel.findById(req.params.categoriaId)
        .then(categoria => {
            if (!categoria) {
                return res.status(404).send({
                    message: "No se encuentra la categoría con Id: " + req.params.categoriaId
                });
            }
            res.send(categoria);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "No se encuentra la categoría con Id: " + req.params.categoriaId
                });
            }
            return res.status(500).send({
                message: "Error al recuperar categoría con Id: " + req.params.categoriaId
            });
        });
};

//Actualizar una categoría
let categoriaActualizar = (req, res) => {
    categoriaModel.findByIdAndUpdate(req.params.categoriaId, {
        nom: req.body.nom,
        pare: req.body.pare
    }, { new: true })
        .then(categoria => {
            if (!categoria) {
                return res.status(404).send({
                    message: "No se encuentra la categoría con Id: " + req.params.categoriaId
                });
            }
            res.send(categoria);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "No se encuentra la categoría con Id: " + req.params.categoriaId
                });
            }
            return res.status(500).send({
                message: "Error al actualizar la categoría con Id: " + req.params.categoriaId
            });
        });
};

//Eliminar una categoría
let categoriaEliminar = (req, res) => {
    categoriaModel.findByIdAndRemove(req.params.categoriaId)
        .then(categoria => {
            if (!categoria) {
                return res.status(404).send({
                    message: "No se encuentra la categoría con Id: " + req.params.categoriaId
                });
            }
            res.send({ messaje: "Categoría eliminada!" });
        }).catch(err => {
            if (err.kind === 'ObjectId' || err.name === 'NotFound') {
                return res.status(404).send({
                    message: "No se encuentra la categoría con Id: " + req.params.categoriaId
                });
            }
            return res.status(500).send({
                message: "No se pudo eliminar la categoría con Id: " + req.params.categoriaId
            });
        });
};

module.exports = {
    categoriaCrear,
    categoriaBuscar,
    categoriaBuscarUna,
    categoriaActualizar,
    categoriaEliminar
}