import { Router } from "express";

import * as collectionController from "../controllers/collection.controller.js";
import { RAW_ROUTES } from "@shared/routes/api-routes.js";

const router = Router();

// Public routes
router.get(
	RAW_ROUTES.COLLECTIONS.ALL,
	collectionController.getAllActiveCollections
);
router.get(
	RAW_ROUTES.COLLECTIONS.DETAIL,
	collectionController.getActiveCollectionDetail
);
router.get(
	RAW_ROUTES.COLLECTIONS.POKEMONS,
	collectionController.getAvailablePokemonsForActiveCollection
);

export default router;
