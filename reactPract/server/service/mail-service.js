import 'dotenv/config'
import nodemailer from 'nodemailer'

class MailService {

    constructor() {
        this.transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: process.env.SMTP_PORT,
            secure: false,
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASSWORD
            }
        })
    }

    async sendVerificationCode(to, code) {
        await this.transporter.sendMail({
            from: process.env.SMTP_USER,
            to,
            subject: "Verification account" + process.env.API_URL,
            text: `Verification code: ${code}`,
        })
    }
}

export default new MailService()