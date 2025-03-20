import { Router } from 'express';
import { requireAuth } from '../middlewares/requireAuth';

const router = Router();

//student
//get all the requests linked to a perticular user
router.route("/pending").get(requireAuth, infraReqPending );
router.route("/completed").get(requireAuth, infraReqCompleted );
router.route("/").post(requireAuth , createInfraReq )

//admin
router.route("/").get(requireAuth, getAllInfraReqs);
router.route("/:id").get(requireAuth, getOneInfraReq );
router.route("/:id").patch(requireAuth, updateInfraReq );
router.route("/:id").delete(requireAuth, deleteInfraReq );

export default router;