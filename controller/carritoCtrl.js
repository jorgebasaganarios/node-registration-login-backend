/*

    Controlador de carrito

*/

'use strict'
const carritoModel = require('../model/carritoModel');

//Crear un carrito
let carritoCrear = (req, res, next) => {
    carritoModel.create(req.body)
        .then((response) => {
            console.log(response);
            res.status(200).send(response);
        })
        .catch(next);
}

//Mostrar todos los carritos
let carritoBuscar = (req, res) => {
    carritoModel.find()
        .then(carrito => {
            res.send(carrito);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Se produjo un error al recuperar el carrito."
            });
        });
};

//Buscar un carrito
let carritoBuscarUno = (req, res) => {
    carritoModel.findById(req.params.carritoId)
        .then(carrito => {
            if (!carrito) {
                return res.status(404).send({
                    message: "No se encuentra el carrito con Id: " + req.params.carritoId
                });
            }
            res.send(carrito);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "No se encuentra el carrito con Id: " + req.params.carritoId
                });
            }
            return res.status(500).send({
                message: "Error al recuperar el carrito con Id: " + req.params.carritoId
            });
        });
};

//Agregar productos al carrito
let agregarACarrito = (req, res) => {
    if(req.params.estado == "true"){
        carritoModel.findByIdAndUpdate(req.params.carritoId, {
            $push: { lista: { prodId: req.params.productoId, precio: req.params.precio, cantidad: req.params.cantidad }}
        }, { new: true })
            .then(carrito => {            
                if (!carrito) {
                    return res.status(404).send({
                        message: "No se encuentra el carrito con Id: " + req.params.carritoId
                    });
                }
                //res.send(carrito);
                res.send({ messaje: "Producto/s añadido/s a tu carrito!" });
            }).catch(err => {
                if (err.kind === 'ObjectId') {
                    return res.status(404).send({
                        message: "No se encuentra el carrito con Id: " + req.params.carritoId
                    });
                }
                return res.status(500).send({
                    message: "Error al recuperar el carrito con Id: " + req.params.carritoId
                });
            });
        //Función para actualizar el total del costo del carrito con el/los producto/s agregados.
        sumarTotal(req.params.carritoId, req.params.precio, req.params.cantidad)  
    }else{
        res.send({ messaje: "ERROR. Este pedido ya está finalizado." });
    }
};

//Función para actualizar el total del costo del carrito con el/los producto/s agregados.
function sumarTotal(carritoId, precio, cantidad){
    var sum = precio * cantidad
    carritoModel.findByIdAndUpdate(carritoId, {
        $inc: { total: sum }
    }, { new: true })
        .then(carrito => {
            if (!carrito) {
                return res.status(404).send({
                    message: "No se encuentra el carrito con Id: " + req.params.carritoId
                });
            }
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "No se encuentra el carrito con Id: " + req.params.carritoId
                });
            }
            return res.status(500).send({
                message: "Error al actualizar el carrito con Id: " + req.params.carritoId
            });
        });
}

//Eliminar productos del carrito
let quitarDeCarrito = (req, res) => {  
    carritoModel.findByIdAndUpdate(req.params.carritoId, {
        $pull: { lista: { prodId: req.params.productoId, precio: req.params.precio, cantidad: req.params.cantidad }}
    }, { new: true })
        .then(carrito => {            
            if (!carrito) {
                return res.status(404).send({
                    message: "No se encuentra el carrito con Id: " + req.params.carritoId
                });
            }
            //res.send(carrito);
            res.send({ messaje: "Producto/s eliminado/s de tu carrito!" });
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "No se encuentra el carrito con Id: " + req.params.carritoId
                });
            }
            return res.status(500).send({
                message: "Error al recuperar el carrito con Id: " + req.params.carritoId
            });
        });
    //Función para actualizar el total del costo del carrito con el/los producto/s agregados.
    restarTotal(req.params.carritoId, req.params.precio, req.params.cantidad)    
};

//Función para actualizar el total del costo del carrito con el/los producto/s agregados.
function restarTotal(carritoId, precio, cantidad){
    var rest = precio * cantidad
    carritoModel.findByIdAndUpdate(carritoId, {
        $inc: { total: -rest }
    }, { new: true })
        .then(carrito => {
            if (!carrito) {
                return res.status(404).send({
                    message: "No se encuentra el carrito con Id: " + req.params.carritoId
                });
            }
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "No se encuentra el carrito con Id: " + req.params.carritoId
                });
            }
            return res.status(500).send({
                message: "Error al actualizar el carrito con Id: " + req.params.carritoId
            });
        });
}

//Eliminar un carrito por completo
let carritoEliminar = (req, res) => {
    carritoModel.findByIdAndRemove(req.params.carritoId)
        .then(carrito => {
            if (!carrito) {
                return res.status(404).send({
                    message: "No se encuentra el carrito con Id: " + req.params.carritoId
                });
            }
            res.send({ messaje: "carrito eliminado!" });
        }).catch(err => {
            if (err.kind === 'ObjectId' || err.name === 'NotFound') {
                return res.status(404).send({
                    message: "No se encuentra el carrito con Id: " + req.params.carritoId
                });
            }
            return res.status(500).send({
                message: "No se pudo eliminar el carrito con Id: " + req.params.carritoId
            });
        });
};

//Finalizar compra y pagar
let carritoPagar = (req, res) => {
    if(req.params.total != 0){
        carritoModel.findByIdAndUpdate(req.params.carritoId, {
            $set: { estado: false }
        }, { new: true })
            .then(carrito => {
                if (!carrito) {
                    return res.status(404).send({
                        message: "No se encuentra el carrito con Id: " + req.params.carritoId
                    });
                }
                res.send({ messaje: "Compra finalizada. Total a pagar: " + req.params.total + "€"});
            }).catch(err => {
                if (err.kind === 'ObjectId' || err.name === 'NotFound') {
                    return res.status(404).send({
                        message: "No se encuentra el carrito con Id: " + req.params.carritoId
                    });
                }
                return res.status(500).send({
                    message: "No se pudo finalizar el carrito con Id: " + req.params.carritoId
                });
            });
    }else{
        res.send({ messaje: "Carrito vacío."});
    }
};

module.exports = {
    carritoCrear,
    carritoBuscar,
    carritoBuscarUno,
    agregarACarrito,
    quitarDeCarrito,
    carritoEliminar,
    carritoPagar
}