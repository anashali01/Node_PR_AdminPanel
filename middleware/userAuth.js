import UserModel from "../models/userSchema.js";

const userAuth = async(req,res,next) => {
    const {ID} = req.cookies;

    if(!ID){
        console.log(`Id not found`);
        return res.redirect('/login');
    }

    let userone = await UserModel.findById(ID);
    res.locals.user = userone;

    return next();

}

export default userAuth;