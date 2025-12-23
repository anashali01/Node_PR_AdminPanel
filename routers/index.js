import { Router } from "express";
import adminRouter from "./adminRouter.js";
import flashMsg from "../middleware/flashMsg.js";
import categoryRouter from "./categoryRouter.js";
import SubcategoryRouter from "./SubcategoryRouter.js"
import productRouter from "./productRouter.js"
import ExtraCategoryRouter from "./ExtracategoryRouter.js"
import homeRouter from "./homeRouter.js"
import isAdmin from "../middleware/isAdmin.js";
import authRouter from "./authRouter.js";
import userAuth from "../middleware/userAuth.js";

const router = Router();


router.use('/',authRouter);
router.get('/', (req, res) => {
    if (!req.cookies.ID) {
        return res.redirect('/login');
    }
    return res.redirect('/home');
});

router.use(userAuth)
router.use('/home',homeRouter);
router.use('/admin' ,flashMsg ,isAdmin, adminRouter);
router.use('/' ,isAdmin, categoryRouter);
router.use('/' ,isAdmin, SubcategoryRouter);
router.use('/' ,isAdmin, ExtraCategoryRouter);
router.use('/' ,isAdmin, productRouter);

export default router;