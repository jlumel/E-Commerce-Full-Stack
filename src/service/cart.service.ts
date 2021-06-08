import cartModel, {Cart} from '../models/cart.model'
import { Request, Response } from 'express'
import {errorLog} from './logger.service'

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
            .catch((err: any) => {
                res.send({ error: 6, descripcion: "Error al crear el carrito" })
                errorLog.error(err)
            })
    },

    getCarts: (req: Request, res: Response) => {
        cartModel.find({})
        .then((carts:Cart[]) => res.send(carts))
        .catch((err: any) => {
            res.send({ error: 7, descripcion: "Carrito no encontrado" })
            errorLog.error(err)
        })
    },

    getCartById: (req: Request, res: Response) => {
        const id = req.params.id
        cartModel.find({ "_id": id })
            .then((cart:Cart) => res.send(cart))
            .catch((err: any) => {
                res.send({ error: 7, descripcion: "Carrito no encontrado" })
                errorLog.error(err)
            })

    },

    removeCart: (req: Request, res: Response) => {
        const id = req.params.id
        cartModel.deleteOne({ "_id": id })
            .then(() => res.sendStatus(204))
            .catch((err: any) => {
                res.send({ error: 8, descripcion: "No se pudo eliminar el carrito" })
                errorLog.error(err)
            })
    },

    addToCart: (req: Request, res: Response) => {
        const id = req.params.id
        const {timestamp, products} = req.body.cart
        const product = req.body.product
        cartModel.updateOne({"_id": id},
        {
            $set: {timestamp, products: product, ...products}
        }
        )
        .then((cart:Cart) => res.send(cart))
        .catch((err: any) => {
            res.send({error: 4, descripcion: "No se pudo actualizar el carrito"})
            errorLog.error(err)
        })
    },

    removeFromCart: (req: Request, res: Response) => {
        const id = req.params.id
        const cart: Cart = req.body.cart
        let {timestamp, products} = cart
        const product = req.body.product
        products = products.filter(product => product !== product)
        cartModel.updateOne({"_id": id},
        {
            $set: {timestamp, products}
        }
        )
        .then((cart:Cart) => res.send(cart))
        .catch((err: any) => {
            res.send({error: 4, descripcion: "No se pudo actualizar el carrito"})
            errorLog.error(err)
        })
    }


}

export default cartService