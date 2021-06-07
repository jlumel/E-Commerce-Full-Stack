import productService from '../service/product.service'
import { Router } from 'express'

const Productos = (router: Router, ADMIN: Boolean) => {

    router.get('/productos', (req, res) => {
        if (req.query.title) {
            productService.getProductByTitle(req, res)
        } else if (req.query.min) {
            productService.getProductsByPrice(req, res)
        } else {
            productService.getProducts(req, res)
        }
    })

    router.post('/productos', (req, res) => {
        if (ADMIN) {
            productService.addProduct(req, res)
        } else {
            res.send({ error: -1, descripcion: `ruta ${req.originalUrl} y metodo ${req.method} no autorizados` })
        }

    })

    router.get('/productos/:id', (req, res) => {
        productService.getProductById(req, res)
    })

    router.patch('/productos/:id', (req, res) => {

        if (ADMIN) {
            productService.updateProduct(req, res)
        } else {
            res.send({ error: -1, descripcion: `ruta ${req.originalUrl} y metodo ${req.method} no autorizados` })
        }

    })

    router.delete('/productos/:id', (req, res) => {
        if (ADMIN) {
            productService.removeProduct(req, res)
        } else {
            res.send({ error: -1, descripcion: `ruta ${req.originalUrl} y metodo ${req.method} no autorizados` })
        }

    })
}

export default Productos