import { Router } from "express";
import adminCtl from "../controllers/adminCtl.js";
import userAuth from "../middleware/userAuth.js";
import uploadImage from "../middleware/image.js";

const adminRouter = Router();



adminRouter.use(userAuth);
adminRouter.get('/' , adminCtl.dashboard);

adminRouter.get('/profilePage',adminCtl.profilepage);
adminRouter.get('/editProfile',adminCtl.editProfilePage);
adminRouter.post('/editProfile',uploadImage,adminCtl.editProfile);





export default adminRouter;