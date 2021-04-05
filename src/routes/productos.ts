import Products from '../service/Products'
import { Router } from 'express'

const Productos = (router: Router, products: Products, ADMIN: Boolean, productsDB:Files) => {

    router.get('/productos', (req, res) => {
        res.send(products.getProducts())
    })

    router.post('/productos', (req, res) => {
        if (ADMIN) {
            const { title, description, code, price, stock, thumbnail } = req.body
            const producto = {
                id: products.getId(),
                timestamp: Date.now(),
                title,
                description,
                code,
                price: Number(price),
                stock,
                thumbnail
            }
            products.addProduct(producto)
            productsDB.write(JSON.stringify(products))

            res.send(producto)
        } else {
            res.send({ error: -1, descripcion: `ruta ${req.originalUrl} y metodo ${req.method} no autorizados` })
        }

    })

    router.get('/productos/:id', (req, res) => {
        const id = Number(req.params.id)
        res.send(products.getProductById(id))
    })

    router.patch('/productos/:id', (req, res) => {

        if (ADMIN) {
            const id = Number(req.params.id)
            let producto = products.list.find(producto => producto.id === id)
            if (!producto) {
                res.sendStatus(404)
            }
            const { title, description, code, price, stock, thumbnail } = req.body
            producto = {
                id: id,
                timestamp: Date.now(),
                title,
                description,
                code,
                price: Number(price),
                stock,
                thumbnail
            }
            products.removeProduct(id)
            products.addProduct(producto)
            products.list.sort((a, b) => a.id - b.id)
            productsDB.write(JSON.stringify(products))
            res.send(producto)
        } else {
            res.send({ error: -1, descripcion: `ruta ${req.originalUrl} y metodo ${req.method} no autorizados` })
        }

    })

    router.delete('/productos/:id', (req, res) => {
        if (ADMIN) {
            const id = Number(req.params.id)
            const producto = products.getProductById(id)
            if (!producto) {
                res.sendStatus(404)
            }
            products.removeProduct(id)
            productsDB.write(JSON.stringify(products))
            res.send(producto)
        } else {
            res.send({ error: -1, descripcion: `ruta ${req.originalUrl} y metodo ${req.method} no autorizados` })
        }

    })
}

export default Productos