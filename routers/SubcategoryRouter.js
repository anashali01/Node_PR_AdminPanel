import { Router } from "express";
import SubcategoryCtl from "../controllers/SubcategoryCtl.js";
import uploadImage from "../middleware/image.js";

const router = Router();

router.get('/add-Subcategory',SubcategoryCtl.addSubCategoryPage);
router.post('/add-Subcategory',uploadImage,SubcategoryCtl.addSubCategory);

router.get('/view-Subcategory',SubcategoryCtl.viewSubCategoryPage);

router.get('/Subcategory/delete/:id',SubcategoryCtl.deleteSubCategory);
router.get('/Subcategory/edit/:id',SubcategoryCtl.editSubCategoryPage);
router.post('/Subcategory/edit/:id',uploadImage , SubcategoryCtl.editSubCategory);


export default router;