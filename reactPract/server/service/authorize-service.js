const bcrypt = require('bcrypt')
const uuid = require('uuid')
const userModel = require('../models/user-model')
const tokenService = require('./token-service')
const UserDto = require('../dto/user-dto')
const AuthDto = require('../dto/auth-dto')
const ApiError = require('../exceptions/api-error')
const reCaptchaService = require('./reCaptcha-service')
const MailService = require('./mail-service')

class authorizeService {
    async createAccount(email, password, location, name, captcha) {
        const candidate = await userModel.findOne({email})
        if(candidate) throw ApiError.BadRequest("Користувач з такою поштою вже існує")
        
        await reCaptchaService.verify(captcha)

        const hashPassword = await bcrypt.hash(password, 3)

        const user = await userModel.create({email, password: hashPassword, location: location, name})

        const userDto = new AuthDto(user)
        const token = tokenService.generate(user._id)

        return {token, user: userDto}
    }

    async login(email, password, captcha) {
        const user = await userModel.findOne({email})
        if(!user) throw ApiError.BadRequest("Користувача з таким email нема")
        const isPassTrue = await bcrypt.compare(password, user.password)
        if(!isPassTrue) throw ApiError.BadRequest("Не правильний email або пароль")

        await reCaptchaService.verify(captcha)

        const userDto = new AuthDto(user)
        const token = tokenService.generate(user._id)

        return {token, user: userDto}
    }

    async deleteAccount(jwt) {
        const {id} = tokenService.decrypt(jwt)
        if(!id) throw ApiError.Unauthorized()
        return await userModel.findByIdAndDelete(id)
    }

    async autoLogin(jwt) {
        const {id}  = tokenService.decrypt(jwt)
        if(!id) throw ApiError.Unauthorized()

        const user = await userModel.findOne({_id: id})
        const userDto = new AuthDto(user)
        return userDto
    }

    async verifyAccount(email) {
        const account = await userModel.findOne({email}) 
        if(!account) throw ApiError.BadRequest('Користувача з таким email нема')
        
        const code = Math.floor(100000 + Math.random() * 900000).toString()
        const hashedCode = await bcrypt.hash(code, 3)
        account.verificationCode = hashedCode
        account.verificationExpires = new Date(Date.now() + 5 * 60 * 1000)
        await account.save()
            // console.log("       WORK ")
        await MailService.sendVerificationCode(email, code)
        return {message: 'ok'}
    }

    async confirmVerification(email, code) {
        const account = await userModel.findOne({email})
        if(!account) throw ApiError.BadRequest('Користувача з таким email нема')

        if(!account.verificationExpires || account.verificationExpires < new Date()) throw ApiError.BadRequest('Просрочений код')
        const valid = await bcrypt.compare(code, account.verificationCode)
        if(!valid) throw ApiError.BadRequest('Не вірний код')
        
        account.verificationCode = ''
        account.verificationExpires = null 
        account.save()

        const userDto = new AuthDto(account)
        const token = tokenService.generate(account._id)

        return {token, user: userDto}
    }
}

module.exports = new authorizeService