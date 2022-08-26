const  JWT = require('jsonwebtoken')
let secret = 'anonymus'

module.exports = {
    sign: (payload) => JWT.sign(payload, secret),
    verify: (token) => JWT.verify(token, secret)
}