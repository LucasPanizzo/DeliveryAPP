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
        type: 
        {
            nombre: { type: String },
            direccion: { type: String },
            tel: {type:Number}
        }
    }
})

export const ordersModels = mongoose.model('orders', ordersSchema)