const ApiError = require('../exceptions/api-error')
const TokenService = require('../service/token-service')

module.exports = function (req, res, next) {
    try {
        const {token} = req.cookies
        if(!token) {
            throw next(ApiError.Unauthorized())
        }

        const id = TokenService.decrypt(token)
        if (!id) {
            return next(ApiError.Unauthorized())
        }

        req.id = id
        next()
    } catch(e) {
        return next(ApiError.Unauthorized())
    }
}