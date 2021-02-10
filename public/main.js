const form = document.querySelector('form')
const botones = document.querySelectorAll('.btn')

const id = () => {
    const input = document.querySelector('#id')

    const id = input.value
    return id
}

const formPOST = '<label for="title">Ingresar nombre del producto</label><input name="title" id="title" type="text"><label for="price">Ingresar precio del producto</label><input name="price" id="price" type="text"><label for="thumbnail">Ingresar URL de la imagen del producto</label><input name="thumbnail" id="thumbnail" type="text"><button type="submit">Enviar</button>'
const formPUT = '<label for="id">Ingresar Id del producto</label><input name="id" id="id" type="text"><label for="title">Ingresar nombre del producto</label><input name="title" id="title" type="text"><label for="price">Ingresar precio del producto</label><input name="price" id="price" type="text"><label for="thumbnail">Ingresar URL de la imagen del producto</label><input name="thumbnail" id="thumbnail" type="text"><button type="submit">Modificar producto</button>'
const formDELETE = '<label for="id">Ingresar Id del producto</label><input name="id" id="id" type="text"><button type="submit">Eliminar producto</button>'
const formGetById = '<label for="id">Ingresar Id del producto</label><input name="input" id="id" type="text"><button type="submit">Buscar producto</button>'

form.innerHTML = formPOST

botones.forEach(btn => {
    btn.style = "cursor:pointer;"
    btn.addEventListener('click', e => {
        switch (e.target.id) {

            case 'post':
                form.method = 'POST'
                form.action = '/api/productos'
                form.innerHTML = formPOST
                break;
            case 'put':
                form.method = 'PUT'
                form.innerHTML = formPUT
                document.querySelector('#id').addEventListener('keyup', e => {
                    form.action = `/api/productos/${e.target.value}`
                })
                break;
            case 'delete':
                form.method = 'DELETE'
                form.innerHTML = formDELETE
                document.querySelector('#id').addEventListener('keyup', e => {
                    form.action = `/api/productos/${e.target.value}`
                })
                break;
            case 'getById':
                form.method = 'GET'
                form.innerHTML = formGetById
                document.querySelector('#id').addEventListener('keyup', e => {
                    form.action = `/api/productos/${e.target.value}`
                })
                break;
        }
    })
});