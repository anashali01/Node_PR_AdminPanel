import { Router } from "express";
import homeCtl from "../controllers/homeCtl.js";

const router = Router();

router.get('/',homeCtl.homepage);

export default router