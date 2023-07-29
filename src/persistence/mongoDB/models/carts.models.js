import mongoose from "mongoose"

const cartsSchema = new mongoose.Schema({
    products: [
            {
                productId: {
                    type: String
                    // type: mongoose.Schema.Types.ObjectId,
                    // ref: "products"
                },
                quantity:Number  
            }

    ]
})

// cartsSchema.pre('find', function (next) {
//     this.populate('products.productId')
//     next()
// })

export const cartsModels = mongoose.model('carts', cartsSchema)