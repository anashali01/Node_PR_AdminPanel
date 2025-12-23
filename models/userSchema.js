import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    username : {
        type : String,
        require : true,
        unique : true
    },
    email : {
        type : String ,
        require : true ,
        lowercase : true ,
        unique : true
    },
    password : {
        type : String,
        require : true,
    },
    image : {
        type : String,
        default:''
    },
    bio : {
        type : String,
        default:''
    },
    DOB : {
        type : String,
        default:''
    },
   role: {
        type: String,
        enum: ['Admin', 'User'],
        default: 'User'
    },
},
{
    timestamps : true
});

const UserModel = mongoose.model('userTbl' , UserSchema);

export default UserModel;