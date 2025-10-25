import jwt from 'jsonwebtoken'
import ApiError from '../exceptions/api-error.js'
import TokenModel from '../models/token-model.js'
import tokenModel from '../models/token-model.js'

class TokenService {
    generate(id) {
        // const payloadObj = {id: payload}
        const accessToken = jwt.sign({id}, process.env.JWT_ACCESS_SECRET, {expiresIn: '5s'})
        const refreshToken = jwt.sign({id}, process.env.JWT_REFRESH_SECRET, {expiresIn: '1d'})
        return {refreshToken, accessToken}
    }
    validateAccessToken(token) {
        try {
            const data = jwt.verify(token, process.env.JWT_ACCESS_SECRET)
            return data
        } catch(e) {
            throw ApiError.Unauthorized()
        }
    }
    validateRefreshToken(token) {
        try {
            const data = jwt.verify(token, process.env.JWT_REFRESH_SECRET)
            return data
        } catch(e) {
            throw ApiError.BadRequest('Не валідний токен')
        }
    }
    async saveToken(userId, refreshToken) {
        const tokenData = await TokenModel.findOne({user: userId})
        if(tokenData) {
            tokenData.refreshToken = refreshToken
            return tokenData.save()
        }
        const date = new Date(Date.now() + 24 * 60 * 60 * 1000)
        const token = await TokenModel.create({user: userId, refreshToken: refreshToken, expiresAt: date})
        return token
    }
    async removeToken(refreshToken) {
        const tokenData = await TokenModel.deleteOne({refreshToken})
        return tokenData
    }
    async findToken(refreshToken) {
        const tokenData = await TokenModel.findOne({refreshToken})
        return tokenData
    }
}

export default new TokenService