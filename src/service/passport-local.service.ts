import bCrypt from 'bcrypt'
import passport_local from 'passport-local'
import userModel from '../models/users.model'
import passport from 'passport'
import { Application, Request } from 'express'
import {User} from '../models/users.model'

const LocalStrategy = passport_local.Strategy
const validatePassword = (user:User, password:string) => bCrypt.compareSync(password, user.password)
const createHash = (password:string) => bCrypt.hashSync(password, bCrypt.genSaltSync(10))

const passportLocal = (app:Application) => {

    passport.serializeUser((user, next:Function) => {
        next(null, user._id)
    })
    
    passport.deserializeUser((id:string, next:Function) => {
        userModel.findById(id, (err:Object, user:User) => {
            next(err, user)
        })
    })
    
    passport.use('login',
        new LocalStrategy(
            {
                passReqToCallback: true
            },
            (req:Request, username:string, password:string, next:Function) => {
                userModel.findOne({ username: username }, (err:Object, user:User) => {
                    if (err) return next(err)
                    if (!user) {
                        console.log('Usuario no encontrado')
                        return next(null, false)
                    }
                    if (!validatePassword(user, password)) {
                        console.log('Password inválida')
                        return next(null, false)
                    }
                    return next(null, user)
                })
            }
        )
    )
    
    passport.use('register',
        new LocalStrategy(
            {
                passReqToCallback: true
            },
            (req, username, password, next) => {
                const findOrCreateUser = () => {
                    userModel.findOne({ username: username }, (err:Object, user:User) => {
                        if (err) {
                            console.log(err)
                            return next(err)
                        }
                        if (user) {
                            console.log('Usuario ya existe')
                            return next(null, false)
                        } else {
                            let newUser = new userModel()
                            newUser.username = username
                            newUser.password = createHash(password)
                            newUser.save(err => {
                                if (err) {
                                    console.log(err)
                                    throw err
                                }
                                console.log('Usuario registrado')
                                return next(null, newUser)
                            })
                        }
                    })
                }
                process.nextTick(findOrCreateUser)
            }
        )
    )
    
    app.use(passport.initialize())
    app.use(passport.session())
}

module.exports = passportLocal
