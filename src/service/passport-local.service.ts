import bCrypt from 'bcrypt'
import passport_local from 'passport-local'
import userModel, { User } from '../models/users.model'
import passport from 'passport'
import { Application, Request } from 'express'
import { logger, errorLog } from './logger.service'

const LocalStrategy = passport_local.Strategy
const validatePassword = (user: User, password: string) => bCrypt.compareSync(password, user.password)
const createHash = (password: string) => bCrypt.hashSync(password, bCrypt.genSaltSync(10))

const passportLocal = (app: Application) => {

    passport.serializeUser((user: any, next: any) => {
        next(null, user._id)
    })

    passport.deserializeUser((id: string, next: any) => {
        userModel.findById(id, (err: any, user: User) => {
            next(err, user)
        })
    })

    passport.use('login',
        new LocalStrategy(
            {
                passReqToCallback: true
            },
            (req: Request, username: string, password: string, next: any) => {
                userModel.findOne({ username: username }, (err: any, user: User) => {
                    if (err) return next(err)
                    if (!user) {
                        logger.info('Usuario no encontrado')
                        return next(null, false)
                    }
                    if (!validatePassword(user, password)) {
                        logger.info('Password inválida')
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
            (req: Request, username: string, next: any) => {
                const findOrCreateUser = () => {
                    userModel.findOne({ username: username }, (err: Object, user: User) => {
                        if (err) {
                            errorLog.error(err)
                            return next(err)
                        }
                        if (user) {
                            logger.info('Usuario ya existe')
                            return next(null, false)
                        } else {
                            const { username, password, email, firstName, lastName, address, age, phone, avatar } = req.body
                            let newUser = new userModel()
                            newUser.username = username
                            newUser.password = createHash(password)
                            newUser.email = email
                            newUser.firstName = firstName
                            newUser.lastName = lastName
                            newUser.address = address
                            newUser.age = Number(age)
                            newUser.phone = phone
                            newUser.avatar = avatar
                            newUser.save((err: any) => {
                                if (err) {
                                    errorLog.error(err)
                                    throw err
                                }
                                logger.info('Usuario registrado')
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

export default passportLocal
