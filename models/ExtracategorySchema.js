import mongoose from "mongoose";

const ExtraCategorySchema = new mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    image : {
        type : String,
        required : true
    },
    category : {
        type : mongoose.Schema.ObjectId,
        ref : 'category',
        required : true
    },
    Subcategory : {
        type : mongoose.Schema.ObjectId,
        ref : 'Subcategory',
        required : true
    }
},{
    timestamps : true
});

const ExtraCategory = mongoose.model("ExtraCategory" , ExtraCategorySchema);

export default ExtraCategory;