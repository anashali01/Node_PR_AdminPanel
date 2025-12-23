import mongoose from "mongoose";

const SubcategorySchema = new mongoose.Schema({
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
    }
},{
    timestamps : true
});

const SubCategory = mongoose.model("Subcategory" , SubcategorySchema);

export default SubCategory;