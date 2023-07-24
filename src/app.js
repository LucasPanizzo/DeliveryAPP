import express from "express";
import { __dirname } from "./utils.js";
import session from "express-session";
import MongoStore from 'connect-mongo'
import './mongoDB/dbConfig.js'
import orders from './orders.router.js'

// Declarations
const app = express()
const port = 8080

// Server
const httpServer = app.listen(port, () => {
    console.log('Listening to port ' + port);
})

app.use(
    session({
        secret: 'secretKey',
        resave: false,
        saveUninitialized: true,
        store: new MongoStore({
            mongoUrl: 'mongodb+srv://lucaspanizzo99:Panizzo99@coderhouse.3xliklk.mongodb.net/ecommerce?retryWrites=true&w=majority'
        }),
    })
)
app.use(express.json())
app.use(express.text())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(__dirname + '/public'))
app.get('/',(req,res)=>{
    console.log('yes');
})

app.use('/api/orders',orders)