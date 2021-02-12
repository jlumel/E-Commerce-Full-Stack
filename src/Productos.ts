interface Product {
    id: number
    title: string
    price: number
    thumbnail: string
}

interface Productos {
    list: Product[]
}

class Productos {

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

    removeProduct(id:number) {
        const removedProduct = this.list.find(producto => producto.id === id)
        this.list = this.list.filter(producto => producto !== removedProduct)
        return removedProduct
    }

}

export default Productos