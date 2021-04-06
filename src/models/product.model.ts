import mongoose from 'mongoose'

const productModel = mongoose.model('Producto', new mongoose.Schema(
    {
        timestamp: {type: Number, required: true},
        title: {type: String, required: true},
        description: {type: String, required: true},
        code: {type: String, required: true},
        price: {type: Number, required: true},
        stock: {type: Number, required: true},
        thumbnail: {type: String, required: true}
    }
)
)

export default productModel