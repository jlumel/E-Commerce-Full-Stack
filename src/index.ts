import express from 'express';
import path from 'path'
import handlebars from 'express-handlebars'
import Products from './Productos'

const app = express()
const router = express.Router()

app.engine(
    'hbs', handlebars({
        extname: '.hbs',
        defaultLayout: 'index.hbs',
        layoutsDir: path.join(__dirname , '../views/layouts'),
        partialsDir: path.join(__dirname , '../views/partials')
    })
)

app.set('view engine', 'hbs')
app.set('views', './views')

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static('public'))
app.use('/api', router)

const PORT: number = 8080

const products = new Products()

app.get('/', (req, res)=> {
    res.sendFile('index.html')
})

router.get('/productos', (req, res)=> {
res.render('productList', products)
})

router.post('/productos', (req, res) => {
    const { title, price, thumbnail } = req.body
    const producto = {
        id: products.list.length + 1,
        title,
        price:Number(price),
        thumbnail
    }
    products.addProduct(producto)
    res.sendFile(path.join(__dirname , '../public/index.html'))
})

router.get('/productos/:id', (req, res) => {
    const id = Number(req.params.id)
    res.send(products.getProductById(id))
})

router.put('/productos/:id', (req,res)=> {
    const id = Number(req.params.id)
    let product = products.list.find(producto=> producto.id === id)
    if(!product){
        res.sendStatus(404)
    }
    const {title, price, thumbnail} = req.body
    product = {
        id,
        title,
        price: Number(price),
        thumbnail
    }
    products.removeProduct(id)
    products.addProduct(product)
    res.send(product)
})

router.delete('/productos/:id', (req, res)=> {
    const id = Number(req.params.id)
    const producto = products.list.find(producto => producto.id === id)
    if(!producto) {
        res.sendStatus(404)
    }
    res.send(products.removeProduct(id))
})



const server = app.listen(PORT, () => {
    console.log(`Server up in port ${PORT}`)
})

server.on('error', error => {
    console.log(`Ha ocurrido el siguiente error: ${error}`)
})