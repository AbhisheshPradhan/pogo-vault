import { Router } from "express";
import * as pokemonController from "../controllers/pokemon.controller.js";
import * as collectionController from "../controllers/collection.controller.js";
import { RAW_ROUTES } from "@shared/routes/api-routes.js";

const router = Router();

// Pokemons
router.get(RAW_ROUTES.ADMIN.POKEMONS, pokemonController.getAllPokemon);
router.patch(
	RAW_ROUTES.ADMIN.TOGGLE_POKEMONS_AVAILABILITY,
	pokemonController.toggleAvailability
);

// Collections
router.patch(
	RAW_ROUTES.ADMIN.REORDER_COLLECTIONS,
	collectionController.updateCollectionsOrder
);
router.get(
	RAW_ROUTES.ADMIN.COLLECTIONS,
	collectionController.getAllCollections
);
router.put(RAW_ROUTES.ADMIN.COLLECTIONS, collectionController.createCollection);

router.patch(
	RAW_ROUTES.ADMIN.COLLECTION_DETAIL,
	collectionController.updateCollection
);
export default router;
