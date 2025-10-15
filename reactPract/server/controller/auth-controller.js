const { validationResult } = require('express-validator');
const authorizeService = require('../service/authorize-service')
const ApiError = require('../exceptions/api-error')

class authController {
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
        res.clearCookie('token')
        res.status(200)
    }

    async deleteAccount(req, res, next) {
        try {
            const {token} = req.cookies
            const result = await authorizeService.deleteAccount(token)
            if(!result) throw ApiError.Unauthorized()
                
            res.clearCookie('token')
            res.json({message: 'account deleted'})
        }catch(e) {
            next(e)
        }
    }

    async autoLogin(req, res, next) {
        try{
            const {token} = req.cookies

            const response = await authorizeService.autoLogin(token)
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

            const {token, user} = await authorizeService.confirmVerification(email, code)
            res.cookie('token', token, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})
            res.json(user)
        }catch(e) {
            next(e)
        }
    }
}

module.exports = new authController