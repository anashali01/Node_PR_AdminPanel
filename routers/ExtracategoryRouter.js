import { Router } from "express";
import ExtraCategoryCtl from "../controllers/ExtraCategoryCtl.js";
import uploadImage from "../middleware/image.js";

const router = Router();

router.get('/add-ExtraCategory',ExtraCategoryCtl.addExtraCategoryPage);
router.post('/add-ExtraCategory',uploadImage,ExtraCategoryCtl.addExtraCategory);

router.get('/view-ExtraCategory',ExtraCategoryCtl.viewExtraCategoryPage);

router.get('/ExtraCategory/delete/:id',ExtraCategoryCtl.deleteExtraCategory);
router.get('/ExtraCategory/edit/:id',ExtraCategoryCtl.editExtraCategoryPage);
router.post('/ExtraCategory/edit/:id',uploadImage , ExtraCategoryCtl.editExtraCategory);

export default router;