import mongoose from "mongoose"

const puzzleSchema = new mongoose.Schema({
    SKU: {
        type: String,
        required: false
    },
    make: {
        type: String,
        required: false
    },
    model: {
        type: String,
        required: true
    },
    pieces: {
        type: Number,
        required: true
    },
    width: {
        type: Number,
        required: false
    },
    height: {
        type: Number,
        required: false
    },
    tags: [String],
    category: {
        type: String,
        required: false
    },
    description: {
        type: String,
        required: false
    },
    forAge: {
        type: Number,
        required: false
    },
    releaseYear: {
        type: Number,
        required: false
    },
    price: {
        type: Number,
        required: true
    },
    isOnSale: {
        type: Boolean,
        required: false,
        default: false
    },
    originalPrice: {
        type: Number,
        required: true
    },
    pic: [String],
    condition: {
        type: Number,
        required: false
    },
    stock: {
        type: Number,
        required: true
    },
    exchange: {
        type: Boolean,
        required: false,
        default: false
    },
    sellerId: {
        type: String,
        required: false
    },
    rating: {
        type: Number,
        required: false
    },
    reviews: [String],
    rentPrice: {
        type: Number,
        required: false
    },    
})

export default mongoose.models.Puzzles || mongoose.model('Puzzles', puzzleSchema)