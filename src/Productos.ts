interface Productos {
    list: any[]
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

    addProduct(producto: object) {

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

}

export default Productos