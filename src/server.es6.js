import Products from './Productos'
import Websockets from './Websockets'
import express from 'express'
import Routes from './Router'

const app = express()
const http = require('http').createServer(app)
const io = require('socket.io')(http)

const router = express.Router()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))
app.use('/api', router)

const PORT = 8080

const products = new Products()

app.get('/', (req, res) => {
    res.sendFile('index.html')
})

Websockets(io, products)

Routes(router, products)

http.listen(PORT, () => {
    console.log(`Server up in port ${PORT}`)
})