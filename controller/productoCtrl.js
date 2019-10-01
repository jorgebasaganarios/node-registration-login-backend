/*

    Controlador de producto

*/

'use strict'
const productoModel = require('../model/productoModel');

//Crear un producto
let productoCrear = (req, res, next) => {
    productoModel.create(req.body)
        .then((response) => {
            console.log(response);
            res.status(200).send(response);
        })
        .catch(next);
}

//Mostrar todos los productos
let productoBuscar = (req, res) => {
    productoModel.find()
        .then(productos => {
            res.send(productos);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Se produjo un error al intentar recuperar el producto."
            });
        });
};

//Buscar un producto por Id
let productoBuscarUno = (req, res) => {
    productoModel.findById(req.params.productoId)
        .then(producto => {
            if (!producto) {
                return res.status(404).send({
                    message: "No se encuentra el producto con Id: " + req.params.productoId
                });
            }
            res.send(producto);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "No se encuentra el producto con Id: " + req.params.productoId
                });
            }
            return res.status(500).send({
                message: "Error al recuperar el producto con Id: " + req.params.productoId
            });
        });
};

//Actualizar un producto
let productoActualizar = (req, res) => {
    productoModel.findByIdAndUpdate(req.params.productoId, {
        nombre: req.body.nombre,
        precio: req.body.precio,
        stock: req.body.stock,
        cat: req.body.cat 
    }, { new: true })
        .then(producto => {
            if (!producto) {
                return res.status(404).send({
                    message: "No se encuentra el producto con Id: " + req.params.productoId
                });
            }
            res.send(producto);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "No se encuentra el producto con Id: " + req.params.productoId
                });
            }
            return res.status(500).send({
                message: "Error al actualizar el producto con Id: " + req.params.productoId
            });
        });
};

//Eliminar un producto
let productoEliminar = (req, res) => {
    productoModel.findByIdAndRemove(req.params.productoId)
        .then(producto => {
            if (!producto) {
                return res.status(404).send({
                    message: "No se encuentra el producto con Id: " + req.params.productoId
                });
            }
            res.send({ messaje: "Producto eliminado!" });
        }).catch(err => {
            if (err.kind === 'ObjectId' || err.name === 'NotFound') {
                return res.status(404).send({
                    message: "No se encuentra el producto con Id:  " + req.params.productoId
                });
            }
            return res.status(500).send({
                message: "No se pudo eliminar el producto con Id: " + req.params.productoId
            });
        });
};

module.exports = {
    productoCrear,
    productoBuscar,
    productoBuscarUno,
    productoActualizar,
    productoEliminar
}