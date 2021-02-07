import express from 'express';

const app = express()

app.use(express.json())

const PORT: number = 3001

interface Product {
    id: number
    title: string
    price: number
    thumbnail: string
}

let products: any[] = []

app.get('/productos', (req, res) => {
    if (!products.length) {
        res.send({ error: "No hay productos cargados" })
    } else {
        res.send(products)
    }
})

app.post('/productos', (req, res) => {
    const { title, price, thumbnail } = req.body
    const producto: Product = {
        id: products.length + 1,
        title,
        price,
        thumbnail
    }
    products.push(producto)
    res.send(producto)
})

app.get('/productos/:id', (req, res) => {
    const id = Number(req.params.id)
    const producto = products.find(producto => producto.id === id)
    if (!producto) {
        res.send({ error: "Producto no encontrado" })
    }
    res.send(producto)
})



const server = app.listen(PORT, () => {
    console.log(`Server up in port ${PORT}`)
})

server.on('error', error => {
    console.log(`Ha ocurrido el siguiente error ${error}`)
})