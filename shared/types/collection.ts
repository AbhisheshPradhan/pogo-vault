export type CollectionFilter = {
	field: string;
	operator: string;
	value: string | boolean;
};

export interface Collection {
	id: string;
	name: string;
	slug: string;
	description: string;
	type: CollectionType;
	isActive: boolean;
	order: number;
	filters: CollectionFilter[];
	pokemonCount: number;
}

export interface CollectionWithPokemonsResponse extends Collection {
	pokemonList: any;
}

/**
 * Used for the Creation Form
 */
export type CollectionCreateInput = Omit<
	Collection,
	"id" | "slug" | "isActive" | "order" | "pokemonCount"
>;

/**
 * Data required to update an existing collection.
 * All fields are optional to allow for "patch" updates.
 */
export type CollectionUpdateInput = Omit<
	Collection,
	"id" | "slug" | "pokemonCount"
>;

// Displayed in this Order
export const COLLECTION_TYPES = {
	LIVING_DEX: { label: "Living Dex", color: "blue" },
	REGIONAL_POKEDEX: { label: "Regional Pokédex", color: "green" },
	SPECIAL_COLLECTION: { label: "Special Collection", color: "red" },
	CUSTOM: { label: "Custom Collection", color: "gray" },
} as const;

export type CollectionType = keyof typeof COLLECTION_TYPES;

export const CollectionTypeValue = Object.fromEntries(
	Object.keys(COLLECTION_TYPES).map((key) => [key, key])
) as { [K in CollectionType]: K };
