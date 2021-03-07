import Product from './Product'

class Products {

    list: Product[]

    constructor() {
        this.list = []
    }

    getProducts() {
        if (!this.list.length) {
            return ({ error: "No hay productos cargados" })
        } else {
            return this.list
        }
    }

    addProduct(producto: Product) {

        this.list.push(producto)
        return producto
    }

    getProductById(id: number) {
        const producto = this.list.find(producto => producto.id === id)
        if (!producto) {
            return { error: "Producto no encontrado" }
        }
        return producto
    }

    removeProduct(id: number) {
        const removedProduct = this.list.find(producto => producto.id === id)
        this.list = this.list.filter(producto => producto !== removedProduct)
        return removedProduct
    }

    getId() {
        if (!this.list.length) {
            return 1
        } else {

            return this.list.map(product => product.id)[this.list.length - 1] + 1
        }
    }

}

export default Products