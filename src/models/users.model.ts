import mongoose, { ObjectId } from 'mongoose'

export interface User extends mongoose.Document {

    username: string
    password: string
}

const userModel = mongoose.model('User', new mongoose.Schema<User>(
    {
        username: {type: String, required: true},
        password: {type: String, required: true},
    }
)
)

export default userModel