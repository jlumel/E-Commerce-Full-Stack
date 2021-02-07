import express from 'express';
import Products from './Productos'

const app = express()

app.use(express.json())

const PORT: number = 8080

interface Product {
    id: number
    title: string
    price: number
    thumbnail: string
}

const products = new Products()

app.get('/productos', (req, res) => {
    res.send(products.getProducts())
})

app.post('/productos', (req, res) => {
    const { title, price, thumbnail } = req.body
    const producto: Product = {
        id: products.list.length + 1,
        title,
        price,
        thumbnail
    }
    products.addProduct(producto)
    res.send(producto)
})

app.get('/productos/:id', (req, res) => {
    const id = Number(req.params.id)
    res.send(products.getProductById(id))
})



const server = app.listen(PORT, () => {
    console.log(`Server up in port ${PORT}`)
})

server.on('error', error => {
    console.log(`Ha ocurrido el siguiente error ${error}`)
})