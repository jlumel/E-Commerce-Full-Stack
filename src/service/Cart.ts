import Product from './Product'

class Cart {

    id:number
    timestamp:number
    products:Product[]

    constructor(id:number,timestamp:number) {
        this.id = id
        this.timestamp = timestamp
        this.products = []
    }

    getProducts() {
        if (!this.products.length) {
            return ({ error: "No hay productos en el carrito" })
        } else {
            return this.products
        }
    }

    addProduct(product:Product) {
        this.products.push(product)
        return product
    }

    getProductById(id: number) {
        const producto = this.products.find(producto => producto.id === id)
        if (!producto) {
            return { error: "Producto no encontrado" }
        }
        return producto
    }

    removeProduct(id: number) {
        const removedProduct = this.products.find(producto => producto.id === id)
        this.products = this.products.filter(producto => producto !== removedProduct)
        return removedProduct
    }

}

export default Cart