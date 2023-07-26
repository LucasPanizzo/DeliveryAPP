import { Router } from "express";
import passport from "passport";
import usersManager from "../persistence/DAOS/users.manager.js";

const router = Router()
const inst = new usersManager

router.post('/register', passport.authenticate('register', {
    failureRedirect: '/registerWrong',
    successRedirect: '/',
    passReqToCallback: true
}))

router.post('/login',
    passport.authenticate('login', {
        failureRedirect: "/loginWrong",
        passReqToCallback: true
    }), async (req, res) => {
        req.session.userInfo = req.user
        res.json(req.session.userInfo)
})

router.get("/current",async (req,res)=>{
    console.log(req.session.userInfo);
    const current = await inst.currentSession(req.session.userInfo)
    res.json(current)
})

export default router