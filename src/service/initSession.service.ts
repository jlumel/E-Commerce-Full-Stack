import cookieParser from 'cookie-parser'
import MongoStore from 'connect-mongo'
import session from 'express-session'
import {Application} from 'express'
import dotenv from 'dotenv'

dotenv.config()
const advancedOptions = { useNewUrlParser: true, useUnifiedTopology: true }

const initSession = (app:Application) => {
    app.use(cookieParser())
    app.use(session({
        store: MongoStore.create({
            mongoUrl: process.env.MONGO_URL,
            mongoOptions: advancedOptions
        }),
        secret: 'session',
        cookie: { maxAge: 600000 },
        resave: false,
        saveUninitialized: false
    }))
} 

export default initSession