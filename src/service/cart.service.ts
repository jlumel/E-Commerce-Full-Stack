import cartModel from '../models/cart.model'
import { Request, Response } from 'express'

const cartService = {

    createCart: (req: Request, res: Response) => {
        const { timestamp, products } = req.body
        const cart = {
            timestamp,
            products
        }
        const nuevoCart = new cartModel(cart)
        nuevoCart.save()
            .then(() => res.sendStatus(201))
            .catch(err => {
                res.send({ error: 6, descripcion: "Error al crear el carrito" })
                console.log(err)
            })
    },

    getCarts: (req: Request, res: Response) => {
        cartModel.find({})
        .then(carts => res.send(carts))
        .catch(err => {
            res.send({ error: 7, descripcion: "Carrito no encontrado" })
            console.log(err)
        })
    },

    getCartById: (req: Request, res: Response) => {
        const id = req.params.id
        cartModel.find({ "_id": id })
            .then(cart => res.send(cart))
            .catch(err => {
                res.send({ error: 7, descripcion: "Carrito no encontrado" })
                console.log(err)
            })

    },

    removeCart: (req: Request, res: Response) => {
        const id = req.params.id
        cartModel.deleteOne({ "_id": id })
            .then(() => res.sendStatus(204))
            .catch(err => {
                res.send({ error: 8, descripcion: "No se pudo eliminar el carrito" })
                console.log(err)
            })
    }


}

export default cartService