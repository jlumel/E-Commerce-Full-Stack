class Product {

    id: number
    timestamp: number
    title: string
    description: string
    code: string
    price: number
    stock: number
    thumbnail: string

    constructor(id: number, timestamp: number, title: string, description: string, code: string, price: number, stock: number, thumbnail: string) {
        this.id = id
        this.timestamp = timestamp
        this.title = title
        this.description = description
        this.code = code
        this.price = price
        this.stock = stock
        this.thumbnail = thumbnail
    }
}

export default Product