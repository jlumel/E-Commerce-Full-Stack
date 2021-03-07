import Products from './service/Products'
import Carts from './service/Carts'
import express from 'express'
import productos from './routes/productos'
import carrito from './routes/carrito'
import Files from './service/Files'

const app = express()

const port = process.env.PORT || 8080
const ADMIN: Boolean = true

const router = express.Router()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))
app.use('/', router)

const productsDB = new Files('./src/repositories/products.txt')
const cartsDB = new Files('./src/repositories/carts.txt')
let products = new Products()
if (productsDB.read()) {
    products.list = JSON.parse(productsDB.read()).list
}

let carts = new Carts()

if (cartsDB.read()) {
    carts.list = JSON.parse(cartsDB.read()).list
}

productos(router, products, ADMIN, productsDB)

carrito(router, carts, cartsDB)

const server = app.listen(port, () => {
    console.log(`Server up in port ${port}`)
})

server.on('error', error => {
    console.log(error)
})