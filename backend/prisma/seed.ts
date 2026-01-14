// backend/scripts/seed.ts (Updated for Correct Mapping)

import { randomUUID } from "crypto";
import { prisma } from "../src/lib/prisma";
import {
	Pokemon as PokemonModel,
	Collection as CollectionModel,
	Prisma,
} from "../generated/prisma/client";

import PokemonData from "./data/pokemon.json";
import CollectionData from "./data/collection.json";

async function seedPokemon(pokemonList: PokemonModel[]) {
	console.log(`\n🌱 Starting upsert for ${pokemonList.length} Pokémon...`);

	const upsertPromises = pokemonList.map((data: PokemonModel) => {
		return prisma.pokemon.upsert({
			where: { id: data.id },
			update: { ...data },
			create: {
				...data,
			},
		});
	});

	const results = await Promise.all(upsertPromises);
	console.log(
		`✅ Pokémon Seeding successful! Total Pokémon upserted: ${results.length}`
	);
	return results.length;
}

function mapFrontendFiltersToPrisma(filters: any[]): Prisma.PokemonWhereInput {
	const prismaWhere: any = {};

	filters.forEach((filter) => {
		const { field, operator, value } = filter;

		switch (operator) {
			case "equals":
				prismaWhere[field] = value;
				break;
			case "contains":
				prismaWhere[field] = { contains: value, mode: "insensitive" };
				break;
			case "in":
				prismaWhere[field] = { in: value };
				break;
			case "gt":
				prismaWhere[field] = { gt: value };
				break;
			case "lt":
				prismaWhere[field] = { lt: value };
				break;
			// Add more operators as your frontend grows
			default:
				prismaWhere[field] = value;
		}
	});

	return prismaWhere;
}

async function seedCollections(collectionList: CollectionModel[]) {
	console.log(
		`\n📚 Starting dynamic upsert for ${collectionList.length} Collections...`
	);

	for (const data of collectionList) {
		// 1. Cast the JSON filters to the Prisma 'where' type
		// This tells TypeScript/Prisma to treat the JSON as a valid query
		const queryFilter = mapFrontendFiltersToPrisma(
			data.filters as any[]
		) as Prisma.PokemonWhereInput;

		// 2. Calculate the count
		const availablePokemonCount = await prisma.pokemon.count({
			where: { ...queryFilter, availableInPogo: true },
		});

		// 3. Upsert
		await prisma.collection.upsert({
			where: { id: data.id },
			update: {
				...data,
				pokemonCount: availablePokemonCount,
			},
			create: {
				...data,
				pokemonCount: availablePokemonCount,
			},
		});
	}

	console.log(`✅ Collection Seeding successful!`);
	return collectionList.length;
}

async function main() {
	const pokemonList: PokemonModel[] = PokemonData as PokemonModel[];
	const collectionList: CollectionModel[] =
		CollectionData as CollectionModel[];

	// --- Execute Seeding Functions Sequentially ---
	// Ensure all foundational data is inserted before moving to dependent data (if applicable)

	// Seed 1: Pokemon
	const pokemonCount = await seedPokemon(pokemonList);

	// Seed 2: Collections
	const collectionCount = await seedCollections(collectionList);

	console.log(`\n--- ALL SEEDING COMPLETE ---`);
	console.log(`Pokémon records: ${pokemonCount}`);
	console.log(`Collection records: ${collectionCount}`);
}

main()
	.catch(async (e) => {
		console.error(
			"Seeding failed with error:",
			e instanceof Error ? e.message : e
		);
		await prisma.$disconnect();
		process.exit(1);
	})
	.finally(async () => {
		await prisma.$disconnect();
	});
