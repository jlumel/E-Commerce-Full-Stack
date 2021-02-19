import Products from './Productos'
import express from 'express'

const app = express()
const http = require('http').createServer(app)
const io = require('socket.io')(http)

const router = express.Router()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))
app.use('/api', router)

const PORT: number = 8080

const products = new Products()

let id = 0

app.get('/', (req, res) => {
    res.sendFile('index.html')
})

io.on('connection', (socket: SocketIO.Socket) => {
    // socket.emit('products', 'Desde el Server')
    console.log(`Nueva conexión ID: ${socket.id}`)
    if (products.list.length) {
        products.list.forEach(product => socket.emit('product', product))
    }

    socket.on('product', message => {
        const producto = {
            id: ++id,
            ...message
        }
        io.emit('product', message)
        products.addProduct(producto)
    })
})

io.on('disconnect', () => {
    console.log('Se desconecto el websocket')
})

router.get('/productos', (req, res) => {
    res.send(products.getProducts())
})

router.post('/productos', (req, res) => {
    const { title, price, thumbnail } = req.body
    const producto = {
        id: ++id,
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



const server = http.listen(PORT, () => {
    console.log(`Server up in port ${PORT}`)
})

// server.on('error', error => {
//     console.log(`Ha ocurrido el siguiente error: ${error}`)
// })