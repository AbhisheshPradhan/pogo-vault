import { prisma } from "../lib/prisma.js";
import { POKEMON_SORT_ORDER } from "../constants/sortOrder.js";

export const getAllPokemon = async (availableOnly: boolean = false) => {
	const where = availableOnly ? { availableInPogo: true } : {};

	const [pokemonList, totalPokemonCount] = await Promise.all([
		prisma.pokemon.findMany({
			where,
			orderBy: [{ dexNum: "asc" }, ...POKEMON_SORT_ORDER],
		}),
		prisma.pokemon.count({ where }),
	]);

	return { pokemonList, totalPokemonCount };
};

export const toggleAvailability = async (id: string) => {
	const currentPokemon = await prisma.pokemon.findUnique({
		where: { id },
		select: { availableInPogo: true, name: true },
	});

	if (!currentPokemon) {
		throw new Error(`Pokémon with ID ${id} not found.`);
	}

	const newAvailabilityStatus = !currentPokemon.availableInPogo;

	const updatedPokemon = await prisma.pokemon.update({
		where: { id },
		data: { availableInPogo: newAvailabilityStatus },
	});

	return {
		message: `Availability for ${currentPokemon.name} updated to ${newAvailabilityStatus}.`,
		pokemon: updatedPokemon,
	};
};
