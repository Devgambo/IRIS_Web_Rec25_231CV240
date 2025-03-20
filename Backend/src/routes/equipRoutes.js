import { Router } from 'express';
import { requireAuth } from '../middlewares/requireAuth';

const router = Router();

//student
router.route("/:cat_id").get(requireAuth,getAllEquipsFromACat);

//admin
router.route("/").get(requireAuth,getAllEquip);
router.route("/").post(requireAuth,addNewEquip);
router.route("/:id").patch(requireAuth,updateEquip);
router.route("/:id").delete(requireAuth,deleteEquip);

export default router;