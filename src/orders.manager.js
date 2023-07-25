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
    async getAllOrders(){
        try {
            const ordersList = await ordersModels.find({})
            return ordersList
        } catch (error) {
            console.log(error);  
        }
    }
    async getOrderByID(orderID){
        try {
            const order = await ordersModels.findById(orderID)
            return order
        } catch (error) {
            console.log(error);  
        }
    }
    async updateOrder(orderID,actualizacion){
        try {
            const updateOrder = await ordersModels.findOneAndUpdate({ _id: orderID }, { ...actualizacion })
            return updateOrder
        } catch (error) {
            console.log(error);
        }
    }
    async deliveredOrder(orderID){
        try {
            const actualizacion = {entregado: true}
            const updatedOrder = await this.updateOrder(orderID,actualizacion)
            return updatedOrder
        } catch (error) {
            
        }
    }
}