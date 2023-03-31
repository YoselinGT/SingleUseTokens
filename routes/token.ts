import {Router} from "express";
import {genToken, isTokenValid} from "../controllers/token";

const router = Router();


router.get('/:token',isTokenValid);
router.post('/',genToken);


export default router;