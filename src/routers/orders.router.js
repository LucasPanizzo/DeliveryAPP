import { Router } from "express";
import orderManager from "../persistence/DAOS/orders.manager.js";

const inst = new orderManager
const router = Router()

router.post('/', async (req, res) => {
    const local = 'La esquina'
    const client = {
        nombre: `${req.session.userInfo.first_name} ${req.session.userInfo.last_name}`,
        direccion: req.session.userInfo.direccion,
        tel: req.session.userInfo.telefono
    }
    const products = [
        {
            productId: 'Producto1',
            quantity: 3
        },
        {
            productId: 'Producto2',
            quantity: 4
        }
    ]
    const newOrder = inst.createOrder(products, client, local)
    res.send(newOrder)
})

router.get('/', async (req, res) => {
    const ordersList = await inst.getAllOrders()
    res.send(ordersList)
})

router.post('/deliveryOrder/:orderID', async (req, res) => {
    const orderID = req.params.orderID
    await inst.deliveredOrder(orderID)
    res.send('Pedido entregado correctamente')
})

router.put('/assingRider/:orderID',async (req,res)=>{
    const orderID = req.params.orderID
    await inst.assignOrder(orderID,req.session.userInfo)
    res.send('Rider asignado')
})

export default router