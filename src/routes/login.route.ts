import passport from 'passport'
import { Request, Response, Router } from 'express'


const login = (router: Router) => {

    router.get('/login', (req: Request, res: Response)=> {
        res.render('login')
    })

    router.get('/faillogin', (req, res) => {
        res.render('./failLogin')
    })

    router.get('/logout', (req: Request, res: Response) => {
        // const { username } = req.session.user
        req.logout()
        // res.render('./logout', { username })
        res.redirect('/login')

    })

    router.post('/login', passport.authenticate('login', { failureRedirect: '/faillogin' }), (req: Request, res: Response) => {

        res.send(200).redirect('/')
    })

}

export default login