/*

    Rutas de usuario

*/

'use strict'

const express = require('express')
const usuarioCtrl = require('../controller/usuarioCtrl')
const auth = require('../middlewares/auth')
const userRouter = express.Router()


userRouter.post('/signup', usuarioCtrl.signUp)
userRouter.post('/signin', usuarioCtrl.signIn)
userRouter.get('/usuarioBuscar', usuarioCtrl.usuarioBuscar)
userRouter.get('/usuarioBuscarUno/:usuarioId', usuarioCtrl.usuarioBuscarUno)
userRouter.put('/usuarioActualizar/:usuarioId', usuarioCtrl.usuarioActualizar)
userRouter.delete('/usuarioEliminar/:usuarioId', usuarioCtrl.usuarioEliminar)

userRouter.get('/private', auth, (req, res) => {
  res.status(200).send({ message: 'Tienes acceso' })
})

module.exports = userRouter