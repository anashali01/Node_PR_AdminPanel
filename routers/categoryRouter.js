import { Router } from "express";
import categoryCtl from "../controllers/categoryCtl.js";
import uploadImage from "../middleware/image.js";

const router = Router();

router.get('/add-category',categoryCtl.addCategoryPage);
router.post('/add-category',uploadImage,categoryCtl.addCategory);

router.get('/view-category',categoryCtl.viewCategoryPage);

router.get('/category/delete/:id',categoryCtl.deleteCategory);
router.get('/category/edit/:id',categoryCtl.editCategoryPage);
router.post('/category/edit/:id',uploadImage , categoryCtl.editCategory);


export default router;