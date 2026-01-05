import { API_ROUTES } from '@shared/routes/api-routes';
import type {
    Collection,
    CollectionCreateInput,
    CollectionUpdateInput,
    Pokemon,
} from '@shared/types';
import { api } from '../api/client';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000';

export interface FetchPokemonListRes {
    pokemonList: Pokemon[];
    totalPokemonCount: number;
}

export const fetchAllPokemons = async (): Promise<FetchPokemonListRes> => {
    console.log(
        `Fetching Pokémon list from: ${API_BASE_URL}/api/admin/pokemons`,
    );

    try {
        const response = await fetch(`${API_BASE_URL}/api/admin/pokemons`);

        if (!response.ok) {
            // Throw an error if the HTTP status is not 2xx
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const pokemonListRes: FetchPokemonListRes = await response.json();

        return pokemonListRes;
    } catch (error) {
        console.error('Error fetching local Pokémon list:', error);
        // Depending on your application's error handling, you might return an empty array or re-throw the error.
        throw new Error('Failed to connect to the local API for Pokémon data.');
    }
};

export interface UpdateAvailabilityInPogoResponse {
    pokemon: Pokemon;
    message: string;
}

export const updateAvailabilityInPogo = async (
    id: string,
): Promise<UpdateAvailabilityInPogoResponse> => {
    console.log(
        `Updating pogo availability using: ${API_BASE_URL}/api/admin/pokemons/toggle-pogo-availability/`,
    );

    try {
        const response = await fetch(
            `${API_BASE_URL}/api/admin/pokemons/toggle-pogo-availability/` + id,
            {
                method: 'PATCH',
            },
        );

        if (!response.ok) {
            // Throw an error if the HTTP status is not 2xx
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const updateAvailbilityInPogoRes: UpdateAvailabilityInPogoResponse =
            await response.json();

        return updateAvailbilityInPogoRes;
    } catch (error) {
        console.error('Error fetching local Pokémon list:', error);
        // Depending on your application's error handling, you might return an empty array or re-throw the error.
        throw new Error('Failed to connect to the local API for Pokémon data.');
    }
};

export interface FetchCollectionsListResponse {
    collectionList: Collection[];
    totalCollectionCount: number;
}

export const fetchAllCollections = async (): Promise<
    FetchCollectionsListResponse[]
> => {
    const route = API_ROUTES.ADMIN.COLLECTIONS;

    console.log(`Fetching All Admin Collections from: ${route}`);

    try {
        const response = await api.get<FetchCollectionsListResponse[]>(route);
        return response.data;
    } catch (error: any) {
        const message =
            error.response?.data?.message || 'Failed to load admin collections';
        console.error('Error fetching admin collection list:', message);

        throw new Error(message);
    }
};

export const createCollection = async (
    data: CollectionCreateInput,
): Promise<Collection> => {
    const route = API_ROUTES.ADMIN.COLLECTIONS;
    console.log(`Creating Admin Collection at: ${route}`);

    try {
        const response = await api.put<Collection>(route, data);
        return response.data;
    } catch (error: any) {
        const message =
            error.response?.data?.message || 'Failed to create collection';
        console.error('Error creating local Collection item:', message);

        throw new Error(message);
    }
};

export const updateCollection = async (
    id: string,
    data: CollectionUpdateInput,
): Promise<FetchCollectionsListResponse> => {
    const route = API_ROUTES.ADMIN.COLLECTION_DETAIL.replace(':id', id);
    console.log(`Updating Collection ${id} at: ${route}`);

    try {
        const response = await api.patch<FetchCollectionsListResponse>(
            route,
            data,
        );

        return response.data;
    } catch (error: any) {
        const message =
            error.response?.data?.message || 'Failed to update collection';
        console.error('Error updating Collection:', message);

        throw new Error(message);
    }
};

export const updateCollectionsOrder = async (orderedIds: string[]) => {
    const route = API_ROUTES.ADMIN.REORDER_COLLECTIONS;

    console.log(`Re-ordering collections at: ${route}`);

    try {
        // Axios handles JSON.stringify and Headers for you
        const response = await api.patch(route, { orderedIds });

        return response.data;
    } catch (error: any) {
        const message =
            error.response?.data?.message || 'Failed to update order';
        console.error('Reorder Error:', message);
        throw new Error(message);
    }
};
