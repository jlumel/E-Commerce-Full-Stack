import productModel, {Product} from '../models/product.model'
import { Request, Response } from 'express'
import {errorLog} from './logger.service'

const productService = {

    getProducts: (req: Request, res: Response) => {
        productModel.find({})
            .then((products:Product[]) => res.send(products))
            .catch((err: any) => {
                res.send({error: 1, descripcion: "No hay productos cargados"})
                errorLog.error(err)
            })
    },

    addProduct: (req: Request, res: Response) => {

        const { timestamp, title, description, code, price, stock, thumbnail } = req.body
        const producto = {
            timestamp,
            title,
            description,
            code,
            price,
            stock,
            thumbnail
        }
        const nuevoProducto = new productModel(producto)
        nuevoProducto.save()
            .then(() => res.sendStatus(201))
            .catch((err: any) => {
                res.send({error: 2, descripcion: "Error al cargar el producto"})
                errorLog.error(err)
            })
    },

    getProductById: (req: Request, res: Response) => {
        const id = req.params.id
        productModel.find({ "_id": id })
            .then((product:Product) => res.send(product))
            .catch((err: any) => {
                res.send({error: 3, descripcion: "Producto no encontrado"})
                errorLog.error(err)
            })
    },

    getProductByTitle: (req: Request, res: Response)=> {
        const {title} = req.query
        productModel.find({title: {$regex: `${title}`, $options: "$i"}})
            .then((product:Product) => res.send(product))
            .catch((err: any) => {
                res.send({error: 3, descripcion: "Producto no encontrado"})
                errorLog.error(err)
            })
    },

    getProductsByPrice: (req: Request, res: Response)=> {
        const {min, max} = req.query
        productModel.find({ price: {$lte: Number(max), $gte: Number(min)}})
            .then((product:Product) => res.send(product))
            .catch((err: any) => {
                res.send({error: 3, descripcion: "Producto no encontrado"})
                errorLog.error(err)
            })
    },

    updateProduct: (req: Request, res: Response) => {
        const id = req.params.id
        const { timestamp, title, description, code, price, stock, thumbnail } = req.body
        const producto = {
            timestamp,
            title,
            description,
            code,
            price,
            stock,
            thumbnail
        }
        productModel.updateOne({ "_id": id },
            {
                $set: { ...producto }
            }
        )
            .then((producto:Product) => res.send(producto))
            .catch((err: any) => {
                res.send({error: 4, descripcion: "No se pudo actualizar el producto"})
                errorLog.error(err)
            })
    },

    removeProduct:(req: Request, res: Response) => {
        const id = req.params.id
        productModel.deleteOne({ "_id": id })
            .then(() => res.sendStatus(204))
            .catch((err: any) => {
                res.send({error: 5, descripcion: "No se pudo eliminar el producto"})
                errorLog.error(err)
            })
    }

}

export default productService