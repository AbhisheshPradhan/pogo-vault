import { createApiMap } from "./route.utils";

export const RAW_ROUTES = {
	USER: {
		BASE: "/user",
		SYNC: "/sync",
		CATCHES: "/catches",
		TOGGLE_CATCH: "/toggle-catch",
		RESET_PROGRESS: "/reset-progress",
	},
	COLLECTIONS: {
		BASE: "/collections",
		ALL: "",
		DETAIL: "/:id",
		POKEMONS: "/:slug/pokemons",
	},
	ADMIN: {
		BASE: "/admin",
		POKEMONS: "/pokemons",
		TOGGLE_POKEMONS_AVAILABILITY: "/pokemons/toggle-pogo-availability/:id",
		COLLECTIONS: "/collections",
		COLLECTION_DETAIL: "/collections/:id",
		REORDER_COLLECTIONS: "/collections/reorder",
	},
} as const;

export const API_ROUTES = createApiMap(RAW_ROUTES);
