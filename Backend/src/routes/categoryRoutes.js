import { Router } from 'express';
import { requireAuth } from '../middlewares/requireAuth';

//get all on basis of there types (equip | infra)
router.route("/").get(requireAuth,getAllCategory);
router.route("/").post(requireAuth,createCategory);

export default router;