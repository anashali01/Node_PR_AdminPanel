import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    image: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'category',
        require: true
    },
    Subcategory: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Subcategory',
        required: true
    },
    ExtraCategory: {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'ExtraCategory',
        required : true
    }

}, {
    timestamps: true
});

const Product = mongoose.model("product", productSchema);

export default Product;