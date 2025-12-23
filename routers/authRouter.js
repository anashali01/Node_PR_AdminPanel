import { Router } from "express";
import authCtl from "../controllers/authCtl.js";
import userAuth from "../middleware/userAuth.js";
import upload from "../middleware/image.js";



const authRouter = Router();

authRouter.get('/signup' , authCtl.signupUserPage);
authRouter.post('/signup' , authCtl.signupUser);
authRouter.get('/login' , authCtl.loginUserPage);
authRouter.post('/login'  ,authCtl.loginUser);
authRouter.get('/email' , authCtl.emailPage);
authRouter.post('/email' , authCtl.email);
authRouter.post('/otp' , authCtl.otp);
authRouter.post('/newPassword' , authCtl.newPassword);
authRouter.get('/logout' , authCtl.logout);
authRouter.get('/changePassword' , authCtl.changePasswordPage);
authRouter.post('/changePassword' , authCtl.changePassword);
authRouter.use(userAuth);
authRouter.get('/profilePage',authCtl.profilepage);
authRouter.get('/editProfile',authCtl.editProfilePage);
authRouter.post('/editProfile',upload,authCtl.editProfile);

export default authRouter;