import { Request, Response } from "express";

import * as userService from "../services/user.service.js";

export const syncFirebaseUserWithDatabase = async (
	req: Request,
	res: Response
) => {
	try {
		const { id, username } = req.body;

		const data = await userService.syncFirebaseUserWithDatabase({
			id,
			username,
		});
		res.status(200).json(data);
	} catch (error) {
		console.error("Failed to create User createDatabaseUser:", error);
		res.status(500).json({
			error: "Failed to create User data to the database.",
			details: (error as Error).message,
		});
	}
};

export const getCatchStates = async (req: Request, res: Response) => {
	try {
		const { userId } = req.body;
		const data = await userService.getCatchStates(userId);
		res.status(200).json(data);
	} catch (error) {
		console.error("Failed to get User Catch States:", error);
		res.status(500).json({
			error: "Failed to get User Catch States.",
			details: (error as Error).message,
		});
	}
};

export const toggleCatchState = async (req: Request, res: Response) => {
	try {
		const { pokemonId, userId, collectionId } = req.body;
		const data = await userService.toggleCatchState(
			pokemonId,
			userId,
			collectionId
		);
		res.status(200).json(data);
	} catch (error) {
		console.error("Failed to update User Catch State:", error);
		res.status(500).json({
			error: "Failed to update User Catch State.",
			details: (error as Error).message,
		});
	}
};

export const resetProgress = async (req: Request, res: Response) => {
	try {
		const { userId } = req.body;
		await userService.resetProgress(userId);
		return res.status(204).send();
	} catch (error) {
		console.error("Failed to delete progress for User:", error);
		res.status(500).json({
			error: "Failed to delete progress for User.",
			details: (error as Error).message,
		});
	}
};
