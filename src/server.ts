import express from 'express'
import productos from './routes/productos'
import carrito from './routes/carrito'

const app = express()

const port = process.env.PORT || 8080
const ADMIN: Boolean = true

const router = express.Router()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))
app.use('/', router)

productos(router, ADMIN)
carrito(router)

app.get('/', (req, res) => {
    res.sendFile('index.html')
})

const server = app.listen(port, () => {
    console.log(`Server up in port ${port}`)
    require('./service/dataBaseConnection')
})

server.on('error', error => {
    console.log(error)
})