import ApiError from '../exceptions/api-error.js'
import TokenService from '../service/token-service.js'

export default function (req, res, next) {
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