import dotenv from 'dotenv'
import twilio from 'twilio'
import { User } from '../models/users.model'
dotenv.config()

const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN)

export const sendWhatsapp = (user: User) => {
    client.messages.create({
        body: `Nuevo pedido de ${user.username}-${user.email}`,
        from: 'whatsapp:' + process.env.TWILIO_WHATSAPP_NUMBER,
        to: 'whatsapp:' + process.env.ADMIN_PHONE_NUMBER
    })
}

export const sendSMS = (user: User) => {
    client.messages.create({
        body: `Su pedido ha sido recibido y se encuentra en proceso`,
        from: process.env.TWILIO_NUMBER,
        to: user.phone
    })
}