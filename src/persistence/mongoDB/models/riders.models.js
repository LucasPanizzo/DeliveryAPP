import mongoose from "mongoose";

const ridersSchema = new mongoose.Schema({
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    telefono: {
        type: Number,
        required: true
    },
    tokenResetPassword: {
        type: String,
        required: false,
    },
    tokenExpiration: {
        type: String,
        required: false,
    },
    documents: {
        type: [
            {
                name: { type: String },
                reference: { type: String }
            }
        ],
        required: false
    }
});

export const ridersModels = mongoose.model("riders", ridersSchema);