import { Router } from "express";
import * as userController from "../controllers/user.controller.js";
import { RAW_ROUTES } from "@shared/routes/api-routes.js";

const router = Router();

router.post(RAW_ROUTES.USER.SYNC, userController.syncFirebaseUserWithDatabase);
router.post(RAW_ROUTES.USER.CATCHES, userController.getCatchStates);
router.post(RAW_ROUTES.USER.TOGGLE_CATCH, userController.toggleCatchState);
router.delete(RAW_ROUTES.USER.RESET_PROGRESS, userController.resetProgress);

export default router;
