import { API_ROUTES } from '@shared/routes/api-routes';
import { api } from '../api/client';
import type { Collection, CollectionWithPokemonsResponse } from '@shared/types';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000';

export interface FetchCollectionsListResponse {
    collectionList: Collection[];
    totalCollectionCount: number;
}

export const fetchActiveCollections =
    async (): Promise<FetchCollectionsListResponse> => {
        const route = API_ROUTES.COLLECTIONS.ALL;
        console.log(`Fetching Active Collection list from: ${route}`);

        try {
            const response = await api.get<FetchCollectionsListResponse>(route);
            return response.data;
        } catch (error: any) {
            console.error(
                'Error fetching local Active Collection list:',
                error,
            );

            const message =
                error.response?.data?.message ||
                'Failed to connect to the local API';
            throw new Error(message);
        }
    };

export const fetchPokemonsForActiveCollection = async (
    slug: string,
): Promise<CollectionWithPokemonsResponse> => {
    const route = API_ROUTES.COLLECTIONS.POKEMONS.replace(':slug', slug);

    console.log(`Fetching Pokemons for collection: ${slug} via ${route}`);

    try {
        const response = await api.get<CollectionWithPokemonsResponse>(route);

        return response.data;
    } catch (error: any) {
        const message =
            error.response?.data?.message ||
            'Failed to fetch collection pokemons';
        console.error('Error fetching Active Collection pokemons:', message);

        throw new Error(message);
    }
};

// ADMIN SERVICES
// export const fetchAllCollections =
//     async (): Promise<FetchCollectionsListResponse> => {
//         console.log(
//             `Fetching All Collection list from: ${API_BASE_URL}/api/admin/collections`,
//         );

//         try {
//             const response = await fetch(
//                 `${API_BASE_URL}/api/admin/collections`,
//             );

//             if (!response.ok) {
//                 throw new Error(`HTTP error! Status: ${response.status}`);
//             }

//             const pokemonListRes: FetchCollectionsListResponse =
//                 await response.json();

//             return pokemonListRes;
//         } catch (error) {
//             console.error('Error fetching local Collection list:', error);
//             throw new Error(
//                 'Failed to connect to the local API for Collection data.',
//             );
//         }
//     };

// export const createCollection = async (
//     data: CollectionCreateInput,
// ): Promise<FetchCollectionsListResponse> => {
//     console.log(`Create Collection: ${API_BASE_URL}/api/admin/collections`);

//     try {
//         const response = await fetch(`${API_BASE_URL}/api/admin/collections`, {
//             method: 'PUT',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify(data),
//         });

//         if (!response.ok) {
//             throw new Error(`HTTP error! Status: ${response.status}`);
//         }

//         const pokemonListRes: FetchCollectionsListResponse =
//             await response.json();

//         return pokemonListRes;
//     } catch (error) {
//         console.error('Error creating local Collection item:', error);
//         throw new Error(
//             'Failed to connect to the local API for to create Collection',
//         );
//     }
// };

// export const updateCollection = async (
//     id: string,
//     data: CollectionUpdateInput,
// ): Promise<FetchCollectionsListResponse> => {
//     console.log(
//         `Update Collection: ${API_BASE_URL}/api/admin/collections/${id}`,
//     );

//     try {
//         const response = await fetch(
//             `${API_BASE_URL}/api/admin/collections/${id}`,
//             {
//                 method: 'PATCH',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify(data),
//             },
//         );

//         if (!response.ok) {
//             throw new Error(`HTTP error! Status: ${response.status}`);
//         }

//         const pokemonListRes: FetchCollectionsListResponse =
//             await response.json();

//         return pokemonListRes;
//     } catch (error) {
//         console.error('Error fetching local Collection list:', error);
//         throw new Error(
//             'Failed to connect to the local API for Collection data.',
//         );
//     }
// };

// export const updateCollectionsOrder = async (orderedIds: string[]) => {
//     console.log(
//         `Re-order Collection: ${API_BASE_URL}/api/admin/collections/reorder`,
//     );

//     const response = await fetch(
//         `${API_BASE_URL}/api/admin/collections/reorder`,
//         {
//             method: 'PATCH', // PATCH is appropriate for partial updates
//             headers: { 'Content-Type': 'application/json' },
//             body: JSON.stringify({ orderedIds }),
//         },
//     );

//     if (!response.ok) throw new Error('Failed to update order');
//     return response.json();
// };
