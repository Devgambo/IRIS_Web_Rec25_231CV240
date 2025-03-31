import { createUser, getAllUsers, getStatistics } from '../controllers/userControllers.js'
import { requireAuth } from '../middlewares/requireAuth.middleware.js';
import { Router } from 'express';

const router = Router();

router.route("/signup").post(requireAuth,createUser)
router.route("/").get(requireAuth,  getAllUsers);

router.route("/admin/statistics").get(requireAuth, getStatistics)

export default router;