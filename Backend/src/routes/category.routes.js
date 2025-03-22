import { Router } from 'express';
import { requireAuth } from '../middlewares/requireAuth.middleware.js';
import { createCategory, deleteCategory, getAllCategory } from '../controllers/categoryControllers.js';
import { upload } from '../middlewares/multer.middleware.js'; 

const router = Router();

//get all on basis of there types (equip | infra)
router.route("/")
  .get(requireAuth, getAllCategory)
  .post(requireAuth, upload.single("coverImage"), createCategory)

router.route("/:id").delete(requireAuth,deleteCategory);

export default router;