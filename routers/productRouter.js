import { Router } from "express"
import productCtl from "../controllers/productCtl.js";
import uploadImage from "../middleware/image.js";

const router = Router();

router.get('/add-product',productCtl.addProductPage);
router.post('/add-product',uploadImage,productCtl.addProduct);

router.get('/view-product' , productCtl.viewProductPage);
router.get('/Products/delete/:id' , productCtl.deleteProducts);
router.get('/Products/edit/:id' , productCtl.editProductsPage);
router.post('/Products/edit/:id' ,uploadImage, productCtl.editProduct);
export default router;