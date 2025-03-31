import { Router } from 'express';
import { requireAuth } from '../middlewares/requireAuth.middleware.js';
import { createEquipReq, deleteEquipReq,equipReqByStatus,getAllEquipReqs, getOneEquipReq, updateEquipReq } from '../controllers/equipReqControllers.js';

const router = Router();

//student
//get all the requests linked to a perticular user
router.route("/status").get(requireAuth,  equipReqByStatus );
router.route("/:equip_id").post(requireAuth , createEquipReq )

//admin
router.route("/").get(requireAuth, getAllEquipReqs);
router.route("/:id").get(requireAuth, getOneEquipReq );
router.route("/:id").patch(requireAuth, updateEquipReq );
router.route("/:id").delete(requireAuth, deleteEquipReq );

export default router;