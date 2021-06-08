import mongoose from 'mongoose'

export interface User extends mongoose.Document {

    username: string
    password: string
    email: string
    firstName: string
    lastName: string
    address: string
    age: number
    phone: string
    avatar: string
}

const userModel = mongoose.model('User', new mongoose.Schema<User>(
    {
        username: { type: String, required: true },
        password: { type: String, required: true },
        email: { type: String, required: true },
        firstName: {type: String, required: true},
        lastName: {type: String, required: true},
        address: { type: String, required: true },
        age: { type: Number, required: true },
        phone: { type: String, required: true },
        avatar: { type: String, required: true },


    }
)
)

export default userModel