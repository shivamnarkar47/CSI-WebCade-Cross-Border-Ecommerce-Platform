import mongoose from 'mongoose';
import User from './user.model.js';

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    countInStock: {
        type: Number,
        required: true,
    },
    rating: {
        type: Number,
        required: true,
    },
    numReviews: {
        type: Number,
        required: true,
    },
    soldBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: User,
        required: true, 
    }
}, {
    timestamps: true,

});

const Product = mongoose.model('product', productSchema);

export default Product;