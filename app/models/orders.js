import mongoose from "mongoose"

const itemsSchema = new mongoose.Schema({
    product: {
        type: String,//mongoose.Schema.Types.ObjectId,
        required: true
    },
    qty: {
        type: Number,
        required: true
    }
})
  
const orderSchema = new mongoose.Schema({
    created: {
        type: Number,
        required: true
    },
    checkout_id: {
        type: String,
        required: false
    },
    total: {
        type: Number,
        required: true
    },
    currency: {
        type: String,
        required: true
    },
    paymentIntent: {
        type: String,
        required: false
    },
    isRefunded: {
        type: Boolean,
        required: false
    },
    status: {
        type: String, // vagy number code?
        required: true
    },
    products: [itemsSchema]
})
  
export default mongoose.models.Orders || mongoose.model('Orders', orderSchema)