import passport from "passport";
import mongoose from "mongoose";
import { usersModels } from "../persistence/mongoDB/models/users.models.js";
import { ridersModels } from "../persistence/mongoDB/models/riders.models.js";
import { Strategy as LocalStrategy } from "passport-local";
import { cryptedPassword, comparePasswords } from "../utils.js";

passport.use('register', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}, async (req, email, password, done) => {
    try {
        const user = await usersModels.findOne({ email })
        if (user) {
            return done(null, false)
        } else {
            const newPassword = await cryptedPassword(password)
            const cryptedUser = { ...req.body, password: newPassword }
            const newUser = await usersModels.create(cryptedUser)
            done(null, newUser)
        }
    } catch (error) {
        console.log(error);
    }
}))

passport.use('registerRIDERS', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}, async (req, email, password, done) => {
    try {
        const rider = await ridersModels.findOne({ email })
        if (rider) {
            return done(null, false)
        } else {
            const newPassword = await cryptedPassword(password)
            const cryptedRider = { ...req.body, password: newPassword }
            const newRider = await ridersModels.create(cryptedRider)
            done(null, newRider)
        }
    } catch (error) {
        console.log(error);
    }
}))

passport.use('login', new LocalStrategy(
    {
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true
    }, async (req, email, password, done) => {
        try {
            if (email === 'logicaMail') {
                //LOGICA ADMIN
            } else {
                const user = await usersModels.findOne({ email: email })
                if (user) {
                    const realPassword = await comparePasswords(password, user.password)
                    if (realPassword) {
                        return done(null, user)
                    } else {
                        return done(null, false)
                    }
                } else {
                    return done(null, false)
                }
            }
        } catch (error) {
            console.log(error);
        }
    }))

passport.use('loginRIDERS', new LocalStrategy(
    {
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true
    }, async (req, email, password, done) => {
        try {
            const rider = await ridersModels.findOne({ email: email })
            if (rider) {
                const realPassword = await comparePasswords(password, rider.password)
                if (realPassword) {
                    return done(null, rider)
                } else {
                    return done(null, false)
                }
            } else {
                return done(null, false)
            }
        } catch (error) {
            console.log(error);
        }
    }))

passport.serializeUser(function (user, done) {
    done(null, user._id)
})

passport.deserializeUser(async function (id, done) {
    const user = await usersModels.findById(id)
    done(null, user)
})