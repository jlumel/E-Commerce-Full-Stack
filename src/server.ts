import express from 'express'
import products from './routes/product.route'
import cart from './routes/cart.route'
import initApp from './service/initApp.service'

const app = express()

const PORT = process.env.PORT || 8080

const router = express.Router()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))
app.use('/', router)

products(router, true)
cart(router)

initApp(PORT, app)