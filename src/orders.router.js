import { Router } from "express";
import orderManager from "./orders.manager.js";

const inst = new orderManager
const router = Router()

router.post('/',async (req,res)=>{
    const local = 'La esquina'
    const client = {
        nombre:'Lucas',
        direccion:'Caviahue 520',
        tel:2995972600
    }
    const products = [
        {
            productId:'Producto1',
            quantity:3
        },
        {
            productId:'Producto2',
            quantity:4
        }
    ]
    const newOrder = inst.createOrder(products,client,local)
    res.send(newOrder)
})

router.get('/',async (req,res)=>{
    const ordersList = await inst.getAllOrders()
    res.send(ordersList)
})

router.post('/deliveryOrder/:orderID',async (req,res)=>{
    const orderID = req.params.orderID 
    const deliveredOrder = await inst.deliveredOrder(orderID)
    res.send('Pedido entregado correctamente')
})

export default router