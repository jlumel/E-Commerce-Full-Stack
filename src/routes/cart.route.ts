import { Router } from 'express'
import cartService from '../service/cart.service'

const Carrito = (router: Router) => {

    router.get('/carrito', (req, res) => {
        cartService.getCarts(req, res)
    })

    router.get('/carrito/:id', (req, res) => {

        cartService.getCartById(req, res)
    })

    router.post('/carrito', (req, res) => {
        cartService.createCart(req, res)
    })

    router.delete('/carrito/:id', (req, res) => {
        cartService.removeCart(req, res)
    })
}

export default Carrito