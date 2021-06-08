import mongoose from 'mongoose'

export interface Product extends mongoose.Document {

    timestamp: number
    title: string
    description: string
    code: string
    price: number
    stock: number
    thumbnail: string
}

const productModel = mongoose.model('Producto', new mongoose.Schema<Product>(
    {
        timestamp: { type: Number, required: true },
        title: { type: String, required: true },
        description: { type: String, required: true },
        code: { type: String, required: true },
        price: { type: Number, required: true },
        stock: { type: Number, required: true },
        thumbnail: { type: String, required: true }
    }
)
)

export default productModel