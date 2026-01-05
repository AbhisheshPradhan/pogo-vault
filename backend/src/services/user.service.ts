import { prisma } from "../lib/prisma.js";

export const syncFirebaseUserWithDatabase = async (firebaseUser: {
	id: string;
	username: string | null;
}) => {
	return await prisma.user.upsert({
		where: { id: firebaseUser.id },
		update: {
			username: firebaseUser.username || "New Trainer",
		},
		create: {
			id: firebaseUser.id,
			username: firebaseUser.username || "New Trainer",
		},
	});
};

export const getCatchStates = async (userId: string) => {
	const catchStates = await prisma.userCatchState.findMany({
		where: {
			userId,
			isCaught: true,
		},
		select: {
			pokemonId: true,
		},
	});
	return catchStates.map((s) => s.pokemonId);
};

export const toggleCatchState = async (
	pokemonId: string,
	userId: string,
	collectionId: string
) => {
	return await prisma.$transaction(async (tx) => {
		// 1. Validate both exist
		// const user = await tx.user.findUnique({ where: { id: userId } });
		const pokemon = await tx.pokemon.findUnique({
			where: { id: pokemonId },
		});
		const collection = await tx.collection.findUnique({
			where: { id: collectionId },
		});
		if (!userId || !pokemon || !collection) {
			throw new Error("Invalid Pokemon or Collection ID provided.");
		}

		// 2. Get current state
		const existing = await tx.userCatchState.findUnique({
			where: { userId_pokemonId: { userId, pokemonId } },
		});

		const nextCaughtState = existing ? !existing.isCaught : true;

		// 3. Upsert the specific state
		await tx.userCatchState.upsert({
			where: { userId_pokemonId: { userId, pokemonId } },
			update: { isCaught: nextCaughtState },
			create: { userId, pokemonId, isCaught: nextCaughtState },
		});

		const change = nextCaughtState ? 1 : -1;

		await tx.collectionProgress.upsert({
			where: {
				collectionId_userId: { collectionId, userId },
			},
			update: {
				caughtCount: { increment: change },
			},
			create: {
				userId,
				collectionId,
				caughtCount: nextCaughtState ? 1 : 0,
				totalCount: collection.pokemonCount,
			},
		});

		// 4. FETCH ALL caught IDs for this user to return as the "Truth"
		// We do this inside the transaction to ensure we get the state AFTER the upsert
		const allCaughtStates = await tx.userCatchState.findMany({
			where: {
				userId,
				isCaught: true,
			},
			select: {
				pokemonId: true,
			},
		});

		// Return just the array of IDs [ 'p1', 'p5', ... ]
		return allCaughtStates.map((s) => s.pokemonId);
	});
};

export const resetProgress = async (userId: string) => {
	await prisma.userCatchState.deleteMany({
		where: {
			userId,
		},
	});
	await prisma.collectionProgress.deleteMany({
		where: {
			userId,
		},
	});
	return {
		message: `Deleted all Catch States for ${userId}`,
	};
};
