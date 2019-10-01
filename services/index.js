'use strict'
const jwt = require('jwt-simple');
const moment = require('moment');
const config = require('../config.js')

function createToken(doc) {
    const payload = {
        sub: doc._id,
        iat: moment().unix(),
        exp: moment().add(14, 'days').unix()
    }
    return jwt.encode(payload, config.SECRET_TOKEN)
}

function decodeToken(token) {
    return new Promise((full, rej) => {
        try {
            const payload = jwt.decode(token, config.SECRET_TOKEN);
            if (payload.exp <= moment().unix()) {
                rej({
                    status: 401,
                    message: 'El token ha expirado'
                })
            }
            full(payload.sub)
        } catch (err) {
            rej({
                status: 500,
                message: 'Invalid token'
            })
        }
    })
}

module.exports = { createToken, decodeToken }