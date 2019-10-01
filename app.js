/*

    Proyecto E-commerce del curso Node+Express+Mongo
    Jorge Basagaña Rios

*/

'use strict'
const express = require('express')
const mongoose = require("mongoose")
const bodyParser = require('body-parser')
const app = express()
const rutaUsuario = require('./rutas/usuarioRutas')
const rutaCategoria = require('./rutas/categoriaRutas')
const rutaProducto = require('./rutas/productoRutas')
const rutaCarrito = require('./rutas/carritoRutas')
const config = require('./config.js')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

//Con el require "config" importamos la información necesaria para conectar a la DDBB
mongoose.connect(config.db, { useNewUrlParser: true })
    .then((respuesta) => {
        console.log('DDBB conection ready');
    })
    .catch((errores) => {
        console.log(errores.stack);
    });

app.listen(config.puerto, () => {
    console.log("Server on");
});


//No olvidar poner "api" también en las url del Postman
app.use("/api", rutaUsuario);
app.use("/api", rutaCategoria);
app.use("/api", rutaProducto);
app.use("/api", rutaCarrito);

module.exports = app