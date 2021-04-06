import mongoose from 'mongoose'

mongoose.connect('mongodb://localhost:27017/ecommerce',
{
    useNewUrlParser: true,
    useUnifiedTopology: true
}
)
.then(()=> console.log('Base conectada'))
.catch(err=> console.log(err))