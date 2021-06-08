import express, { Request, Response } from 'express'
import products from './routes/product.route'
import productService from './service/product.service'
import cart from './routes/cart.route'
import initApp from './service/initApp.service'
import initSession from './service/initSession.service'
import register from './routes/register.route'
import login from './routes/login.route'
import compression from 'compression'

const app = express()

const PORT = process.env.PORT || 8080

const router = express.Router()

app.use(compression())
app.use(express.json())
app.set('view engine', 'ejs')
app.use('/', router)

products(router)
cart(router)
login(router)
register(router)
initSession(app)
initApp(PORT, app)

app.get('/', (req: Request, res: Response) => {
    if (req.isAuthenticated()) {
        productService.getProducts(req, res)
    } else {
        res.redirect('/login')
    }
})