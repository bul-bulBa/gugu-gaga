import { validationResult } from 'express-validator'
import authorizeService from '../service/authorize-service.js'
import ApiError from '../exceptions/api-error.js'

class AuthController {
    async createAccount(req, res, next) {
        try {
            const errors = validationResult(req)
            if(!errors.isEmpty()) throw new Error(errors)
            const {email, password, location, name, captcha} = req.body

            const {token, user} = await authorizeService.createAccount(email, password, location, name, captcha)

            // res.cookie('token', token, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})
            res.json(email)
        } catch (e) {
            return next(e)
        }
    }

    async login(req, res, next) {
        try {
            const {email, password, captcha} = req.body

            const {token, user} = await authorizeService.login(email, password, captcha)
            // res.cookie('token', token, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})
            res.json(email)
        } catch (e) {
            return next(e)
        }
    }

    logout(res) {
        res.clearCookie('accessToken')
        res.clearCookie('refreshToken')
        res.status(200)
    }

    async deleteAccount(req, res, next) {
        try {
            const {accessToken} = req.cookies

            const result = await authorizeService.deleteAccount(accessToken)
            if(!result) throw ApiError.Unauthorized()
                
            res.clearCookie('accessToken')
            res.clearCookie('refreshToken')
            res.json({message: 'account deleted'})
        }catch(e) {
            next(e)
        }
    }

    async autoLogin(req, res, next) {
        try{
            const {accessToken} = req.cookies

            const response = await authorizeService.autoLogin(accessToken)
            res.json(response)
        }catch(e) {
            next(e)
        }
    }

    async verifyAccount(req, res, next) {
        try{
            const {email} = req.body

            await authorizeService.verifyAccount(email)
            res.status(202).json({message: 'ok'})
        }catch(e) {
            next(e)
        }
    }

    async confirmVerification(req, res, next) {
        try{
            const {email, code} = req.body

            const {tokens, user} = await authorizeService.confirmVerification(email, code)
            res.cookie('accessToken', tokens.accessToken, {maxAge: 30 * 60 * 1000, httpOnly: true})
            res.cookie('refreshToken', tokens.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})
            res.json(user)
        }catch(e) {
            next(e)
        }
    }

    async refresh(req, res, next) {
        try{
            console.log('REFRESH')
            const {refreshToken} = req.cookies
            const userData = await authorizeService.refresh(refreshToken) 
            
            res.cookie('accessToken', userData.accessToken, {maxAge: 30 * 60 * 1000})
            res.cookie('refreshToken', userData.refreshToken, {maxAge: 1 * 24 * 60 * 60 * 1000})
            res.json({message: 'ok'})
        }catch(e) {
            next(e)
        }
    }
}

export default new AuthController 