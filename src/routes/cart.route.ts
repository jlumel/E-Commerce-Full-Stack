import { Router } from 'express'
import cartService from '../service/cart.service'
import sendMail from '../service/nodemailer.service'
import {sendWhatsapp, sendSMS} from '../service/twilio.service'
const Carrito = (router: Router) => {

    router.get('/carrito', (req, res) => {
        if (req.isAuthenticated()) {

            cartService.getCarts(req, res)
        } else {
            res.redirect('/login')
        }
    })

    router.get('/carrito/:id', (req, res) => {

        if (req.isAuthenticated()) {

            cartService.getCartById(req, res)
        } else {
            res.redirect('/login')
        }
    })

    router.post('/carrito', (req, res) => {
        if (req.isAuthenticated()) {

            cartService.createCart(req, res)
        } else {
            res.redirect('/login')
        }
    })

    router.delete('/carrito/:id', (req, res) => {
        if (req.isAuthenticated()) {

            cartService.removeCart(req, res)
        } else {
            res.redirect('/login')
        }
    })

    router.post('/checkout', (req, res)=> {
        const cart = req.body.cart
        const user = req.body.user
        sendMail('checkout', user, cart)
        sendWhatsapp(user)
        sendSMS(user)
        res.send(cart)
    })

}

export default Carrito