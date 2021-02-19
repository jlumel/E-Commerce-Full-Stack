const socket = io()

const form = document.querySelector('form')
const title = document.querySelector('#title')
const price = document.querySelector('#price')
const thumbnail = document.querySelector('#thumbnail')
const tbody = document.querySelector('tbody')

form.addEventListener('submit', e => {
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