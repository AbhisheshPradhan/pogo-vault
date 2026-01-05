import { Request, Response } from "express";

import * as collectionService from "../services/collection.service.js";
import { CollectionUpdateInput } from "@shared/types/collection.js";

export const getAllActiveCollections = async (req: Request, res: Response) => {
	try {
		const data = await collectionService.getAllCollections(true);
		res.status(200).json(data);
	} catch (error) {
		console.error(
			"Failed to fetch Collections getAllActiveCollections:",
			error
		);
		res.status(500).json({
			error: "Failed to retrieve All Active Collections data from the database.",
			details: (error as Error).message,
		});
	}
};

export const getActiveCollectionDetail = async (
	req: Request,
	res: Response
) => {
	try {
		const { id } = req.params;
		const data = await collectionService.getActiveCollectionDetail(id);
		res.status(200).json(data);
	} catch (error) {
		console.error(
			"Failed to fetch Collections getActiveCollectionDetail:",
			error
		);
		res.status(500).json({
			error: "Failed to retrieve Active Collection detail from the database.",
			details: (error as Error).message,
		});
	}
};

export const getAvailablePokemonsForActiveCollection = async (
	req: Request,
	res: Response
) => {
	try {
		const { slug } = req.params;
		const data =
			await collectionService.getAvailablePokemonsForActiveCollection(
				slug
			);
		res.status(200).json(data);
	} catch (error) {
		console.error(
			"Failed to fetch Collection getPokemonsForActiveCollection:",
			error
		);
		res.status(500).json({
			error: "Failed to retrieve Pokemons for Active Collection from the database.",
			details: (error as Error).message,
		});
	}
};

// ADMIN FUNCTIONS
export const getAllCollections = async (req: Request, res: Response) => {
	try {
		const data = await collectionService.getAllCollections();
		res.status(200).json(data);
	} catch (error) {
		console.error("Failed to fetch Collections getAllCollections:", error);
		res.status(500).json({
			error: "Failed to retrieve All Collections data from the database.",
			details: (error as Error).message,
		});
	}
};

export const createCollection = async (req: Request, res: Response) => {
	try {
		const { name, description, type, filters } = req.body;

		const data = await collectionService.createCollection({
			name,
			description,
			type,
			filters,
		});
		res.status(200).json(data);
	} catch (error) {
		console.error("Failed to create Collection createCollection:", error);
		res.status(500).json({
			error: "Failed to create Collection data to the database.",
			details: (error as Error).message,
		});
	}
};

interface UpdateParams {
	id: string;
}

export const updateCollection = async (
	req: Request<UpdateParams, any, CollectionUpdateInput>,
	res: Response
) => {
	try {
		const { id } = req.params;
		const { name, description, type, isActive, order, filters } = req.body;

		const data = await collectionService.updateCollection(id, {
			name,
			description,
			type,
			isActive,
			order,
			filters,
		});

		res.status(200).json(data);
	} catch (error) {
		console.error("Failed to update Collection updateCollection:", error);
		res.status(500).json({
			error: "Failed to update Collection data to the database.",
			details: (error as Error).message,
		});
	}
};

export const updateCollectionsOrder = async (req: Request, res: Response) => {
	try {
		const { orderedIds } = req.body;

		if (!Array.isArray(orderedIds)) {
			return res.status(400).json({
				error: "Invalid payload: 'orderedIds' must be an array.",
			});
		}

		// Pass the array to the service layer
		const result = await collectionService.reorderCollections(orderedIds);

		res.status(200).json({
			message: "Collections reordered successfully",
			orderedIds: orderedIds,
		});
	} catch (error) {
		console.error("Failed to reorder Collections list:", error);
		res.status(500).json({
			error: "Failed to update Collections order to the database.",
			details: (error as Error).message,
		});
	}
};
