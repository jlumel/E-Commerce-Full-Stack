import Products from './Productos'
import Files from './Files'

const files = new Files('chatlog.txt')

const Websockets = (io: SocketIO.Server, products: Products) => {

    io.on('connection', (socket: SocketIO.Socket) => {

        console.log(`Nueva conexión ID: ${socket.id}`)
        if (products.list.length) {
            products.list.forEach(product => socket.emit('product', product))
        }

        socket.on('product', message => {
            const producto = {
                id: products.getId(),
                ...message
            }
            io.emit('product', message)
            products.addProduct(producto)
        })

        socket.on('chat', message => {
            const msj = Object.values(message).join(' ')
            files.write(msj)
            io.emit('chat', message)
        })
    })

    io.on('disconnect', () => {
        console.log('Se desconecto el Websocket')
    })

}

export default Websockets