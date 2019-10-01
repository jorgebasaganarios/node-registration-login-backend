/*

    Schemas para usuario

*/

'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcrypt')

const UsuarioSchema = new Schema({
  nombre: { type: String, unique: true, required: true, lowercase: true },
  email: String,
  password: { type: String, select: false }/*,
  pedidos: [
    {
      _id: false,
      cart_id: ObjectId,
      active: {
        type: Boolean,
        default: true
      }
    }
  ]*/,
  signupDate: { type: Date, default: Date.now() },
  lastLogin: Date
})

//Encriptar password del usuario
UsuarioSchema.pre('save', function (next) {
  let usuario = this
  bcrypt.genSalt(10)
    .then((salt) => {
      bcrypt.hash(usuario.password, salt)
      .then((hash) => { usuario.password = hash; next() })
    })
    .catch((err) => { return next(err) })

})

module.exports = mongoose.model('Usuarios', UsuarioSchema)