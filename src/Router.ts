import Products from './Productos'
import { Router } from 'express'

const Routes = (router: Router, products: Products) => {

    router.get('/productos', (req, res) => {
        res.send(products.getProducts())
    })

    router.post('/productos', (req, res) => {
        const { title, price, thumbnail } = req.body
        const producto = {
            id: products.getId(),
            title,
            price: Number(price),
            thumbnail
        }
        products.addProduct(producto)
        res.send(producto)
    })

    router.get('/productos/:id', (req, res) => {
        const id = Number(req.params.id)
        res.send(products.getProductById(id))
    })

    router.put('/productos/:id', (req, res) => {
        const id = Number(req.params.id)
        let product = products.list.find(producto => producto.id === id)
        if (!product) {
            res.sendStatus(404)
        }
        const { title, price, thumbnail } = req.body
        product = {
            id,
            title,
            price: Number(price),
            thumbnail
        }
        products.removeProduct(id)
        products.addProduct(product)
        products.list.sort((a, b) => a.id - b.id)
        res.send(product)
    })

    router.delete('/productos/:id', (req, res) => {
        const id = Number(req.params.id)
        const producto = products.list.find(producto => producto.id === id)
        if (!producto) {
            res.sendStatus(404)
        }
        res.send(products.removeProduct(id))
    })
}

export default Routes