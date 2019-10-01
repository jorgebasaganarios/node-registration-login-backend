/*

    Archivo de configuración

*/

'use strict'

module.exports = {
    db: process.env.MONGODB_URI || "mongodb://localhost:27017/pr_ec",
    puerto: process.env.PORT || 3000,
    SECRET_TOKEN: 'miclavedetokens'
}