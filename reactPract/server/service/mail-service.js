import 'dotenv/config'
import nodemailer from 'nodemailer'
import { Resend } from 'resend'


class MailService {

    // constructor() {
    //     this.transporter = nodemailer.createTransport({
    //         host: process.env.SMTP_HOST,
    //         port: process.env.SMTP_PORT,
    //         secure: false,
    //         auth: {
    //             user: process.env.SMTP_USER,
    //             pass: process.env.SMTP_PASSWORD
    //         }
    //     })
    // }

    // async sendVerificationCode(to, code) {
    //     await this.transporter.sendMail({
    //         from: process.env.SMTP_USER,
    //         to,
    //         subject: "Verification account" + process.env.API_URL,
    //         text: `Verification code: ${code}`,
    //     })
    // }

    constructor() {
        this.resend = new Resend('re_96zX1U4v_2CNb5QRfV4PgRabEwiqUuXMq')
    }

    async sendVerificationCode(to, code) {
        await this.resend.emails.send({
            from: 'support@gugugaga.work',
            to,
            subject: "Verification code for your account",
            html: `<p>Verification code: <b>${code}</b></p>`
        })
    }
}

export default new MailService()