import passport from 'passport'
import sendMail from '../service/nodemailer.service'
import { Request, Response, Router } from 'express'

const register = (router: Router) => {

    router.get('/register', (req: Request, res: Response)=> {
        res.render('register')
    })

    router.get('/failregister', (req: Request, res: Response) => {
        res.render('./failRegister')
    })

    router.post('/register', passport.authenticate('register', { failureRedirect: '/failregister' }), (req: Request, res: Response) => {
        sendMail(req.body.username)
        res.redirect('/')
    })

}

export default register