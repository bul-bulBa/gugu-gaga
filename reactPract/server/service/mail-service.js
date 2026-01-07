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
        this.resend = new Resend('re_dBCw9oRA_7d3SUiD7Yb1jsMS9TigWmz3g')
    }

    async sendVerificationCode(to, code) {
        await this.resend.emails.send({
            from: 'onboarding@resend.dev',
            to,
            subject: "Verification account " + process.env.API_URL,
            html: `<p>Verification code: <b>${code}</b></p>`
        })
    }
}

export default new MailService()