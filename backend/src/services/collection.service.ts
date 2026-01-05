import { POKEMON_SORT_ORDER } from "../constants/sortOrder.js";
import { prisma } from "../lib/prisma.js";
import { generateSlug } from "../utils/slug.js";
import { transformUiFiltersToPrisma } from "../utils/transformUiFiltersToPrisma.js";

import type { CollectionCreateInput } from "@shared/types/collection.js";

export const getAllCollections = async (availableOnly: boolean = false) => {
	const where = availableOnly ? { isActive: true } : {};

	const [collectionList, totalCollectionCount] = await Promise.all([
		prisma.collection.findMany({
			where,
			orderBy: [{ order: "asc" }],
		}),
		prisma.collection.count({ where }),
	]);

	return { collectionList, totalCollectionCount };
};

export const createCollection = async (collection: CollectionCreateInput) => {
	const slug: string = generateSlug(collection.name);
	const order: number = (await prisma.collection.count()) + 1;

	return prisma.collection.create({
		data: {
			...collection,
			slug,
			isActive: true,
			order,
		},
	});
};

export const updateCollection = async (
	id: string,
	data: {
		name?: string;
		description?: string;
		type?: string;
		isActive?: boolean;
		order?: number;
		filters?: any;
	}
) => {
	// Regenerate slug if name changes
	const updateData = data.name
		? { ...data, slug: generateSlug(data.name) }
		: data;

	return prisma.collection.update({
		where: { id },
		data: updateData,
	});
};

export const getCollectionBySlug = async (slug: string) => {
	return prisma.collection.findUnique({
		where: { slug },
	});
};

export const getActiveCollectionDetail = async (slug: string) => {
	return prisma.collection.findUnique({
		where: { slug, isActive: true },
	});
};

export const getAvailablePokemonsForActiveCollection = async (slug: string) => {
	const collection = await prisma.collection.findUnique({
		where: { slug, isActive: true },
	});

	if (!collection || !collection.filters) {
		return { collection, pokemon: [] };
	}

	const prismaReadyFilters = transformUiFiltersToPrisma(
		collection.filters as any
	);

	const pokemonList = await prisma.pokemon.findMany({
		where: { availableInPogo: true, ...prismaReadyFilters },
		orderBy: [{ dexNum: "asc" }, ...POKEMON_SORT_ORDER],
	});

	return {
		...collection,
		pokemonList,
		totalPokemonCount: pokemonList.length,
	};
};

export const reorderCollections = async (ids: string[]) => {
	return await prisma.$transaction(
		ids.map((id, index) =>
			prisma.collection.update({
				where: { id: id },
				data: { order: index },
			})
		)
	);
};
