import { ordersModels } from "./mongoDB/models/orders.models.js";

export default class orderManager {
    async createOrder(products, client, local) {
        try {
            const hora = new Date()
            const obj = {
                products: products,
                client: client,
                local:local,
                fecha: hora
            }
            const newOrder = new ordersModels(obj)
            const orderSaved = await newOrder.save()
            console.log(orderSaved);
            return orderSaved
        } catch (error) {
            console.log(error);
        }
    }
}