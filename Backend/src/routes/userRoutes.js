import { createUser, getAllUsers } from '../controllers/userControllers.js'
import { requireAuth } from '../middlewares/requireAuth.js';
import { requireRole } from '../middlewares/requireRole.js'
import { Router } from 'express';

const router = Router();

router.route("/signup").post(requireAuth,createUser)
router.route("/").get(requireAuth, requireRole("admin") , getAllUsers);

export default router;
