/*

    Rutas de carrito

*/

'use strict'

const express = require('express')
const carritoCtrl = require('../controller/carritoCtrl')
const carritoRouter = express.Router()


carritoRouter.post('/carritoCrear', carritoCtrl.carritoCrear)
carritoRouter.get('/carritoBuscar', carritoCtrl.carritoBuscar)
carritoRouter.get('/carritoBuscarUno/:carritoId', carritoCtrl.carritoBuscarUno)
carritoRouter.put('/agregarACarrito/:estado/:carritoId/:productoId/:precio/:cantidad', carritoCtrl.agregarACarrito)
carritoRouter.put('/quitarDeCarrito/:carritoId/:productoId/:precio/:cantidad', carritoCtrl.quitarDeCarrito)
carritoRouter.delete('/carritoEliminar/:carritoId', carritoCtrl.carritoEliminar)
carritoRouter.put('/carritoPagar/:estado/:carritoId/:total', carritoCtrl.carritoPagar)

module.exports = carritoRouter