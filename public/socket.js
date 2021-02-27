const socket = io()

const productForm = document.querySelector('#productForm')
const title = document.querySelector('#title')
const price = document.querySelector('#price')
const thumbnail = document.querySelector('#thumbnail')
const tbody = document.querySelector('tbody')

const chatForm = document.querySelector('#chatForm')
const email = document.querySelector('#email')
const chat = document.querySelector('#mensajes')
const mensaje = document.querySelector('#msj')


productForm.addEventListener('submit', e => {
    e.preventDefault()
    if (title.value && price.value && thumbnail.value) {
        let data = {
            title: title.value,
            price: price.value,
            thumbnail: thumbnail.value
        }
        socket.emit('product', data)
        title.value = ''
        price.value = ''
        thumbnail.value = ''
    }
})

socket.on('product', message => {

    let tr = document.createElement('tr')
    tr.innerHTML = `
                <td>${message.title}</td>
                <td>${message.price}</td>
                <td><img src=${message.thumbnail}></td>
            `
    tbody.appendChild(tr)

})

chatForm.addEventListener('submit', e => {
    e.preventDefault()
    if (email.value.match(/^[a-zA-Z]+([\.\-]?\w+)*@[a-zA-Z]+([\-]?\w+)*(\.[a-zA-Z]{2,7})$/)) {
        const msj = {
            mail: email.value,
            date: `[${new Date().toLocaleString()}]`,
            msg: mensaje.value
        }
        socket.emit('chat', msj)
        mensaje.value = ''
    }
}
)

socket.on('chat', message => {
    let li = document.createElement('li')
    li.innerHTML = `<span style="color: blue; font-weight: bold;">${message.mail}</span><span style="color: brown;"> ${message.date}</span><span style="color:green; font-style: italic;">: ${message.msg}</span>`
    chat.appendChild(li)
})