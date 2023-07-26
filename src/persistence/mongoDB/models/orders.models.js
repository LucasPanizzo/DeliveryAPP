import mongoose from "mongoose"

const ordersSchema = new mongoose.Schema({
    products: [
            {
                productId: {
                    type: String
                },
                quantity:Number  
            }
    ],
    fecha: {
        type:String
    },
    local: {
        type:String
    },
    client:{        
            nombre: { type: String },
            direccion: { type: String },
            tel: {type:Number}
    },
    entregado: {
        type:Boolean,
        default:false
    },
    rider:{
        type:String,
        default:'libre'
    }
})

export const ordersModels = mongoose.model('orders', ordersSchema)