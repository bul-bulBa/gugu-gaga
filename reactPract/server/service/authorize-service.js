import bcrypt from 'bcrypt'
import { v4 as uuidv4 } from 'uuid'
import userModel from '../models/user-model.js'
import tokenService from './token-service.js'
import UserDto from '../dto/user-dto.js'
import AuthDto from '../dto/auth-dto.js'
import ApiError from '../exceptions/api-error.js'
import reCaptchaService from './reCaptcha-service.js'
import MailService from './mail-service.js'
import {client} from '../index.js'

class AuthorizeService {
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
        await client.set(`dto_${email}`, code, { EX: 180});

        await MailService.sendVerificationCode(email, code)
        return {message: 'ok'}
    }

    async confirmVerification(email, code) {
        const account = await userModel.findOne({email})
        if(!account) throw ApiError.BadRequest('Користувача з таким email нема')

        const value = await client.get(`dto_${email}`);
        if(code !== value) throw ApiError.BadRequest('Не вірний код')

        const userDto = new AuthDto(account)
        const token = tokenService.generate(account._id)

        
        return {token, user: userDto}
    }
}

export default new AuthorizeService