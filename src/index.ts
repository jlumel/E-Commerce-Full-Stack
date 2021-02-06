import express, {Application, Request, Response} from 'express';

const app:Application = express()

app.use(express.json())

const PORT:number = 8080

let gatos:any[] = []

app.get('/gatos', (req:Request, res:Response)=>{
    res.json(gatos)
})

app.post('/gatos', (req:Request, res:Response)=>{
    const {id, nombre, raza, edad} = req.body
    const gato = {
        id,
        nombre,
        raza,
        edad
    }
    gatos.push(gato)
    res.sendStatus(201)
})

app.get('/gatos/:id', (req,res)=> {
    const id = req.params.id
    const gato = gatos.find(gato => gato.id === id)
    if(!gato) {
        res.sendStatus(404)
    }
    res.json(gato)
})

app.patch('/gatos/:id/raza', (req, res)=> {
    const id = req.params.id
    const gato = gatos.find(gato => gato.id === id)
    if(!gato) {
        res.sendStatus(404)
    }

    const {raza} = req.body
    gato.raza = raza
    res.sendStatus(204)
})

app.delete('/gatos/:id', (req, res)=> {
    const id = req.params.id
    const gato = gatos.find(gato => gato.id === id)
    if(!gato) {
        res.sendStatus(404)
    }

    gatos = gatos.filter(gato => gato.id !== id)
    res.sendStatus(200)
})

// app.post('/users',(req, res)=> {
//     res.status(200).send(
//         {
//         params: req.params,
//         queryParams : req.query, 
//         body: req.body
//         }
//     )
// })

app.listen(PORT, ()=> {
    console.log(`Server up in port ${PORT}`)
})