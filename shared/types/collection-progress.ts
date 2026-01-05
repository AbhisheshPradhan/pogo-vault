export interface CollectionProgress {
	caughtCount: number;
	totalCount: number;
	collectionId: string;
	userId: string;
}

export interface NewCollectionProgress extends CollectionProgress {
	id: string;
}
