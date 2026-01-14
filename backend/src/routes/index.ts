import { Router } from "express";

import collectionRoutes from "./collection.routes.js";
import userRoutes from "./user.routes.js";
import adminRoutes from "./admin.routes.js";

import { RAW_ROUTES } from "@shared/routes/api-routes.js";

const router = Router();

// Public Routes
router.use(RAW_ROUTES.COLLECTIONS.BASE, collectionRoutes);
router.use(RAW_ROUTES.USER.BASE, userRoutes);

// Admin Routes
router.use(RAW_ROUTES.ADMIN.BASE, adminRoutes);

export default router;
