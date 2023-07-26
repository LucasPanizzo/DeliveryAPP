import { Router } from "express";
import passport from "passport";
import usersManager from "../persistence/DAOS/users.manager.js";

const router = Router()
const inst = new usersManager

router.post('/register', passport.authenticate('registerRIDERS', {
    failureRedirect: '/registerWrong',
    successRedirect: '/',
    passReqToCallback: true
}))

router.post('/login',
    passport.authenticate('loginRIDERS', {
        failureRedirect: "/loginWrong",
        passReqToCallback: true
    }), async (req, res) => {
        req.session.userInfo = req.user
        res.json(req.session.userInfo)
})

export default router