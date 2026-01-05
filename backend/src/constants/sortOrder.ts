import { Prisma } from "../../generated/prisma/client.js";

export const POKEMON_SORT_ORDER: Prisma.PokemonOrderByWithRelationInput[] = [
	{ isDefault: "desc" },
	{ isGmax: "asc" },
	{ isMega: "asc" },
	{ isFemaleForm: "asc" },
	{ isShadow: "asc" },
	{ isShiny: "asc" },
];
