const productos = document.querySelector('.productos')
const containerProductos = document.querySelector('.container')
const tablaProductos = document.querySelector('.tabla-productos')

const populate = () => {
    containerProductos.innerHTML = `
    <h2>Filtros</h2>
    <form class="row g-3">
  <div class="col-md-6">
    <label for="inputTitle" class="form-label">Title</label>
    <input type="text" class="form-control" id="inputTitle">
  </div>
  <div class="col-12">
    <button type="submit" class="btn btn-primary titlebtn">Buscar</button>
  </div>
  <div class="col-md-4">
    <label for="inputmin" class="form-label">Precio minimo</label>
    <input type="text" class="form-control" id="inputmin">
    <label for="inputmax" class="form-label">Precio máximo</label>
    <input type="text" class="form-control" id="inputmax">
  </div>
  <div class="col-12">
    </div>
  </div>
  <div class="col-12">
    <button type="submit" class="btn btn-primary pricebtn">Buscar</button>
  </div>
    </form>
    <h2>Lista de productos</h2>
    <table class="table table-striped table-hover table-dark mb-5">
    <thead>
    <tr><th scope="col">Title</th><th scope="col">Description</th><th scope="col">Price</th><th scope="col">Thumbnail</th></tr>
    </thead>
    <tbody></tbody>
    </table>
    `
    document.querySelector('.titlebtn').addEventListener('click', e => {
        e.preventDefault()
        if (document.querySelector('#inputTitle').value) {
            document.querySelector('tbody').innerHTML = ''
            fetch(`/productos?title=${document.querySelector('#inputTitle').value}`)
                .then(res => res.json())
                .then(data => {
                    console.log(data)
                    data.forEach(product => {
                        let tr = document.createElement('tr')
                        tr.innerHTML = `
                <td>${product.title}</td>
                <td>${product.description}</td>
                <td>${product.price}</td>
                <td><img src=${product.thumbnail}></td>
            `
                        document.querySelector('tbody').appendChild(tr)
                    })
                })
        }
    })

    document.querySelector('.pricebtn').addEventListener('click', e => {
        e.preventDefault()
        if (document.querySelector('#inputmin').value && document.querySelector('#inputmax').value) {
            document.querySelector('tbody').innerHTML = ''
            fetch(`/productos?min=${document.querySelector('#inputmin').value}&max=${document.querySelector('#inputmax').value}`)
                .then(res => res.json())
                .then(data => {
                    data.forEach(product => {
                        let tr = document.createElement('tr')
                        tr.innerHTML = `
                <td>${product.title}</td>
                <td>${product.description}</td>
                <td>${product.price}</td>
                <td><img src=${product.thumbnail}></td>
            `
                        document.querySelector('tbody').appendChild(tr)
                    })
                })

        }
    })
}

productos.addEventListener('click', e => {
    e.preventDefault()
    populate()
    const tbody = document.querySelector('tbody')
    fetch('/productos')
        .then(res => res.json())
        .then(data => {
            data.forEach(product => {
                let tr = document.createElement('tr')
                tr.innerHTML = `
                <td>${product.title}</td>
                <td>${product.description}</td>
                <td>${product.price}</td>
                <td><img src=${product.thumbnail}></td>
            `
                tbody.appendChild(tr)
            });
        })
})