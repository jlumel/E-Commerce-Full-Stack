import nodemailer from 'nodemailer'
import { logger, errorLog } from './logger.service'
import dotenv from 'dotenv'

dotenv.config()

const sendMail = (username:string) => {
    const transporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        auth: {
            user: process.env.NODEMAILER_USER,
            pass: process.env.NODEMAILER_PASS
        }
    })

    const mailOptions = {
        from: 'Ecommerce NodeJS',
        to: process.env.NODEMAILER_USER,
        subject: 'Información de registro de usuario',
        html: `<h1>${username} se ha registrado exitosamente ${new Date().toLocaleString()}</h1>`
    }
    
    transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
            errorLog.error(err)
            return err
        }
        logger.info(info)
    })
}

export default sendMail

