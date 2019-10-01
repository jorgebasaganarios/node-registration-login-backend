/*

    Schemas para producto

*/

'use strict'
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let productoSchema = new Schema({
    nombre: {
        type: String,
        required: [true, "Nombre Obligatorio"]
    },
    desc: {
        type: String,
        required: false
    },
    precio: {
        type: Number,
        required: [true, "Precio Obligatorio"]
    },
    stock: {
        type: Number,
        required: [true, "stock Obligatorio"]
    },
    cat: {
        type: String,
        required: [true, "producto Obligatoria"]
    },
    fecha: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Productos', productoSchema);