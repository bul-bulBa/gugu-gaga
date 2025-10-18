import ApiError from '../exceptions/api-error.js'

class ReCaptchaService {
    async verify(captcha) {
        const verifyURL = `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${captcha}`

        const res = await fetch(verifyURL, {method: 'POST'}).then(res => res.json())
        if(!res.success) throw ApiError.BadRequest('користувач не пройшов валідацію в reCaptcha')

        return res.success
    }
}

export default new ReCaptchaService 