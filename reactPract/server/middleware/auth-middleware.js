import ApiError from '../exceptions/api-error.js'
import TokenService from '../service/token-service.js'

export default function (req, res, next) {
    try {
        const {accessToken} = req.cookies
        if(!accessToken) {
            throw next(ApiError.Unauthorized())
        }

        const id = TokenService.validateAccessToken(accessToken)
        if (!id) {
            return next(ApiError.Unauthorized())
        }

        req.id = id
        next()
    } catch(e) {
        return next(ApiError.Unauthorized())
    }
}