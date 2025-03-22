import { createUser, getAllUsers } from '../controllers/userControllers.js'
import { requireAuth } from '../middlewares/requireAuth.middleware.js';
import { requireRole } from '../middlewares/requireRole.middleware.js'
import { Router } from 'express';

const router = Router();

router.route("/signup").post(requireAuth,createUser)
router.route("/").get(requireAuth, requireRole("admin") , getAllUsers);

export default router;