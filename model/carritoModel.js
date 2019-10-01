/*

    Schemas para carrito

*/

'use strict'
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let carritoSchema = new Schema({
    usuario: {
        type: String,
        required: [true, 'nombre del comprador']
    },
    estado: {
        type: Boolean,
        default: true //El carrito está activo por defecto.
    },
    lista: [{ 
        prodId: String, 
        precio: Number, 
        cantidad: Number } ],
    total: {
        type: Number
    },
    creado: { type: Date, default: Date.now() }
});

module.exports = mongoose.model('Carritos', carritoSchema);