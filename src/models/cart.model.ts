import mongoose from 'mongoose'
import {Product} from './product.model'

export interface Cart extends mongoose.Document {

    timestamp: number
    products: Product[]
}

const cartModel = mongoose.model('Carrito', new mongoose.Schema<Cart>(
    {
        timestamp: { type: Number, required: true },
        products: { type: Array, required: true }
    }
)
)

export default cartModel