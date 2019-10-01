
/*

    Rutas de categoría

*/

'use strict'
const express = require("express");
const catRouter = express.Router();
const categoriaCtrl = require("../controller/categoriaCtrl");

catRouter.post('/categoriaCrear', categoriaCtrl.categoriaCrear)
catRouter.get('/categoriaBuscar', categoriaCtrl.categoriaBuscar)
catRouter.get('/categoriaBuscarUna/:categoriaId', categoriaCtrl.categoriaBuscarUna)
catRouter.put('/categoriaActualizar/:categoriaId', categoriaCtrl.categoriaActualizar)
catRouter.delete('/categoriaEliminar/:categoriaId', categoriaCtrl.categoriaEliminar)

module.exports = catRouter;