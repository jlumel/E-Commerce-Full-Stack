import nodemailer from 'nodemailer'
import {Product} from '../models/product.model'
import { User } from '../models/users.model'
import { logger, errorLog } from './logger.service'
import dotenv from 'dotenv'

dotenv.config()

const sendMail = (type: string, user: User, cart: Product[]) => {
    const transporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        auth: {
            user: process.env.NODEMAILER_USER,
            pass: process.env.NODEMAILER_PASS
        }
    })

    const registerOptions = {
        from: 'Ecommerce NodeJS',
        to: process.env.NODEMAILER_USER,
        subject: 'Información de registro de usuario',
        html: `<h1>${user.username} se ha registrado exitosamente ${new Date().toLocaleString()}</h1>`
    }

    const checkoutOptions = {
        from: 'Ecommerce NodeJS',
        to: process.env.NODEMAILER_USER,
        subject: `Nuevo pedido de ${user.username} - ${user.email} `,
        html: `<ul>
        ${cart.map(product => `<li>${product}</li>`)}
        </ul>`
    }


    switch (type) {
        case 'register':
            transporter.sendMail(registerOptions, (err, info) => {
                if (err) {
                    errorLog.error(err)
                    return err
                }
                logger.info(info)
            })
            break;
        case 'checkout':
            transporter.sendMail(checkoutOptions, (err, info) => {
                if (err) {
                    errorLog.error(err)
                    return err
                }
                logger.info(info)
            })
            break;
    }




}

export default sendMail

