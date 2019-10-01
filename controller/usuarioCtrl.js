/*

    Controlador de usuario

*/

'use strict'

const Usuario = require('../model/usuarioModel')
const service = require('../services/index.js')

//Registro de usuario
function signUp(req, res) {

  const usuario = new Usuario({
    email: req.body.email,
    nombre: req.body.nombre,
    password: req.body.password
  })
  usuario.save()
    .then((usuario) => {
      res.status(201).send({ token: service.createToken(usuario) })
    })
    .catch((err) => {
      res.status(500).send({ message: `Error al crear el usuario: ${err}` })
    })
}

//Login de usuario
function signIn(req, res) {

  Usuario.find({ email: req.body.email, password: req.body.password }, (err, usuario) => {
    if (err) return res.status(500).send({ message: err })
    if (!usuario) return res.status(404).send({ message: 'No existe el usuario.' })

    req.usuario = usuario
    res.status(200).send({
      message: 'Te has logueado correctamente.',
      token: service.createToken(usuario)
    })
  })
}

//Actualizar datos del usuario
function usuarioActualizar(req, res) {
  Usuario.findByIdAndUpdate(req.params.usuarioId, {
    nombre: req.body.nombre,
    direccion: req.body.direccion,
    email: req.body.email,
    password: req.body.password
  }, { new: true })
    .then(Usuario => {
      if (!Usuario) {
        return res.status(404).send({
          message: "No se encuentra el usuario con Id: " + req.params.usuarioId
        });
      }
      res.send(Usuario);
    }).catch(err => {
      if (err.kind === 'ObjectId') {
        return res.status(404).send({
          message: "No se encuentra el usuario con Id: " + req.params.usuarioId
        });
      }
      return res.status(500).send({
        message: "Error al actualizar el usuario con Id " + req.params.usuarioId
      });
    });
};

//Mostrar todos los usuarios
function usuarioBuscar(req, res) {
  Usuario.find()
    .then(Usuario => {
      res.send(Usuario);
    }).catch(err => {
      res.status(500).send({
        message: err.message || "Se produjo un error al intentar recuperar el usuario."
      });
    });
};

//Buscar un usuario por Id
function usuarioBuscarUno(req, res) {
  Usuario.findById(req.params.usuarioId)
    .then(Usuario => {
      if (!Usuario) {
        return res.status(404).send({
          message: "No se encuentra el usuario con Id: " + req.params.usuarioId
        });
      }
      res.send(Usuario);
    }).catch(err => {
      if (err.kind === 'ObjectId') {
        return res.status(404).send({
          message: "No se encuentra el usuario con Id: " + req.params.usuarioId
        });
      }
      return res.status(500).send({
        message: "Error al recuperar el usuario con Id: " + req.params.usuarioId
      });
    });
};

//Eliminar un usuario por Id
function usuarioEliminar(req, res) {
  Usuario.findByIdAndRemove(req.params.usuarioId)
    .then(Usuario => {
      if (!Usuario) {
        return res.status(404).send({
          message: "No se encuentra el usuario con Id: " + req.params.usuarioId
        });
      }
      res.send({ messaje: "Usuario eliminado!" });
    }).catch(err => {
      if (err.kind === 'ObjectId' || err.name === 'NotFound') {
        return res.status(404).send({
          message: "No se encuentra el usuario con Id: " + req.params.usuarioId
        });
      }
      return res.status(500).send({
        message: "No se pudo eliminar el usuario con Id: " + req.params.usuarioId
      });
    });
};

module.exports = {
  signUp,
  signIn,
  usuarioBuscar,
  usuarioBuscarUno,
  usuarioActualizar,
  usuarioEliminar
}
