import { Request, Response } from "express";

import * as pokemonService from "../services/pokemon.service.js";

// export const getAllPokemonAvailableInPogo = async (
// 	req: Request,
// 	res: Response
// ) => {
// 	try {
// 		const data = await pokemonService.getAllPokemon(true);
// 		res.status(200).json(data);
// 	} catch (error) {
// 		console.error("Failed to fetch Pokémons:", error);
// 		res.status(500).json({
// 			error: "Failed to retrieve Pokémon data from the database.",
// 			details: (error as Error).message,
// 		});
// 	}
// };

// ADMIN FUNCTIONS
export const getAllPokemon = async (req: Request, res: Response) => {
	try {
		const data = await pokemonService.getAllPokemon(false);
		res.status(200).json(data);
	} catch (error) {
		console.error("Failed to fetch Pokémons:", error);
		res.status(500).json({
			error: "Failed to retrieve Pokémon data from the database.",
			details: (error as Error).message,
		});
	}
};

export const toggleAvailability = async (req: Request, res: Response) => {
	try {
		const { id } = req.params;
		const result = await pokemonService.toggleAvailability(id);
		res.status(200).json(result);
	} catch (error) {
		const err = error as Error;

		if (err.message.includes("not found")) {
			return res.status(404).json({ error: err.message });
		}

		console.error(
			`Failed to toggle availability for ID ${req.params.id}:`,
			error
		);
		res.status(500).json({
			error: "Failed to update Pokémon availability.",
			details: err.message,
		});
	}
};
