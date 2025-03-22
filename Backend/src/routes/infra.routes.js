import { Router } from 'express';
import { requireAuth } from '../middlewares/requireAuth.middleware.js';
import { addNewInfra, deleteInfra, getAllInfra, getAllInfraFromACat, updateInfra } from '../controllers/infraControllers.js';

const router = Router();

//student
router.route("/:cat_id").get(requireAuth, getAllInfraFromACat);

//admin
router.route("/").get(requireAuth, getAllInfra);
router.route("/").post(requireAuth, addNewInfra);
router.route("/:id").patch(requireAuth, updateInfra);
router.route("/:id").delete(requireAuth, deleteInfra);

export default router;