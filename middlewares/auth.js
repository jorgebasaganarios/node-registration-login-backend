'use strict'

const services = require('../services');

function isAuth (req, res, next) {
  if (!req.headers.authorization) {
    return res.status(403).send({ message: 'No tienes autorización' })
  }
  
  const token = req.headers.authorization.split(' ')[1]
  console.log(token +' token')
  services.decodeToken(token)
    .then(response => {
      req.usuario = response
      console.log(req.usuario +' decoded')
      next()
    })
    .catch(response => {
      res.status(response.status)
    })
}

module.exports = isAuth
