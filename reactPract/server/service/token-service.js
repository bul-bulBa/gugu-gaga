const jwt = require('jsonwebtoken')
const ApiError = require('../exceptions/api-error')

class tokenService {
    generate(payload) {
        const payloadObj = {id: payload}
        return jwt.sign(payloadObj, process.env.JWT_ACCESS_SECRET, {expiresIn: '30m'})
    }
    decrypt(token) {
        try {
            const data = jwt.verify(token, process.env.JWT_ACCESS_SECRET)
            return data
        } catch(e) {
            throw ApiError.Unauthorized()
        }
    }
}

module.exports = new tokenService