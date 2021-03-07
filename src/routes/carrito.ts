import { Router } from 'express'
import fs from 'fs'
import Files  from '../service/Files'
import Cart from '../service/Cart'
import Carts from '../service/Carts'
import Product from '../service/Product'

const Carrito = (router: Router, carts: Carts, cartsDB:Files) => {

    router.get('/carrito/:id', (req, res) => {

        const carrito = carts.getCart(Number(req.params.id))

        if (carrito) {
            if (!req.body.id) {
                res.send(carts.getCart(Number(req.params.id)))
            } else {

                const id = Number(req.body.id)
                carrito.getProductById(id) ? res.send(carrito.getProductById(id)) : res.send({ error: 'Producto no encontrado' })
            }
        } else {
            res.send({ error: 'Carrito no encontrado' })
        }
    })

    router.post('/carrito/:id', (req, res) => {
        let carrito = carts.getCart(Number(req.params.id))
        const producto: Product = req.body
        if (carrito) {
            carrito.addProduct(producto)
            cartsDB.write(JSON.stringify(carts))
        } else {
            carrito = new Cart(Number(req.params.id), Date.now())
            carrito.addProduct(producto)
            carts.addCart(carrito)
            cartsDB.write(JSON.stringify(carts))
        }
        res.send(producto)
    })

    router.patch('/carrito/:id', (req, res) => {
        let carrito = carts.getCart(Number(req.params.id))
        if (carrito) {
            const id = req.body.id
            const producto = carrito.getProductById(id)
            if (!producto) {
                res.sendStatus(404)
            } else {
                carrito.removeProduct(id)
                cartsDB.write(JSON.stringify(carts))
                res.send(producto)
            }
        } else {
            res.send({ error: 'Carrito no encontrado' })
        }


    })
}

export default Carrito