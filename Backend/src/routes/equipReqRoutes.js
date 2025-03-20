import { Router } from 'express';
import { requireAuth } from '../middlewares/requireAuth';

const router = Router();

//student
//get all the requests linked to a perticular user
router.route("/pending").get(requireAuth, equipReqPending );
router.route("/completed").get(requireAuth, equipReqCompleted );
router.route("/").post(requireAuth , createEquipReq )

//admin
router.route("/").get(requireAuth, getAllEquipReqs);
router.route("/:id").get(requireAuth, getOneEquipReq );
router.route("/:id").patch(requireAuth, updateEquipReq );
router.route("/:id").delete(requireAuth, deleteEquipReq );

export default router;