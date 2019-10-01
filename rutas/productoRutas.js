/*

    Rutas de producto

*/

'use strict'
const express = require("express");
const prodRouter = express.Router();
const productoCtrl = require("../controller/productoCtrl");

prodRouter.post('/productoCrear', productoCtrl.productoCrear)
prodRouter.get('/productoBuscar', productoCtrl.productoBuscar)
prodRouter.get('/productoBuscarUno/:productoId', productoCtrl.productoBuscarUno)
prodRouter.put('/productoActualizar/:productoId', productoCtrl.productoActualizar)
prodRouter.delete('/productoEliminar/:productoId', productoCtrl.productoEliminar)

module.exports = prodRouter;