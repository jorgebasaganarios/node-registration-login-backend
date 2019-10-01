/*

    Schemas para categoría

*/

'use strict'
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let categoriaSchema = new Schema({
    nom: {
        type: String,
        required: [true, 'category name']
    },
    pare: {
        type: String
    }
});

module.exports = mongoose.model('Categorias', categoriaSchema);