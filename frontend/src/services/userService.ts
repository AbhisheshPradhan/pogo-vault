const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000';

import { API_ROUTES } from '@shared/routes/api-routes';
import type { User } from '@shared/types/user';
import { api } from '../api/client';

export const createDatabaseUser = async (user: {
    uid: string;
    username: string;
}) => {
    const route = API_ROUTES.USER.SYNC;
    console.log(`Create or Sync Database User: ${route}`);
    try {
        const response = await api.post<User>(route, {
            id: user.uid,
            username: user.username || 'New Trainer',
        });

        return response.data;
    } catch (error: any) {
        console.error('Error creating Database User:', error);

        // Better error messaging using Axios error object
        const message =
            error.response?.data?.message ||
            'Failed to connect to the local API';
        throw new Error(message);
    }
};

export const toggleUserCatchStates = async (
    pokemonId: string,
    userId: string,
    collectionId: string,
) => {
    const route = API_ROUTES.USER.TOGGLE_CATCH;
    console.log(`Toggle Catch States at: ${route}`);

    try {
        // Axios handles the /api prefix, headers, and stringification
        // We pass the payload as the second argument
        const response = await api.post(route, {
            pokemonId,
            userId,
            collectionId,
        });

        // Axios automatically checks response.ok (status 2xx)
        return response.data;
    } catch (error: any) {
        // Extracting specific error message from your Backend's JSON response
        const errorMessage =
            error.response?.data?.message || 'Failed to update catch state';

        console.error('Error updating local User Catch State:', errorMessage);

        throw new Error(errorMessage);
    }
};

export const fetchAllCatchStatesForUser = async (userId: string) => {
    const route = API_ROUTES.USER.CATCHES;
    console.log(`fetch All Catch States for User: ${route}`);

    try {
        const response = await api.post<string[]>(route, {
            userId,
        });

        return response.data;
    } catch (error: any) {
        // 5. Axios errors have a helpful structure
        const serverMessage = error.response?.data?.message;
        console.error(
            'Error fetching User Catches:',
            serverMessage || error.message,
        );

        throw new Error(
            serverMessage ||
                'Failed to connect to the local API for User Catch State data.',
        );
    }
};

export const deleteAllCatchStatesForUser = async (userId: string) => {
    const route = API_ROUTES.USER.RESET_PROGRESS;
    console.log(`Deleting Catch States at: ${route}`);

    try {
        // NOTE: For DELETE, the body must be wrapped in a { data } object
        const response = await api.delete(route, {
            data: { userId },
        });

        // Axios considers 204 (No Content) a success automatically.
        // If the server returns 204, response.data will usually be empty.
        if (response.status === 204) {
            return { success: true };
        }

        return response.data;
    } catch (error: any) {
        console.error(
            'Error deleting User Catches:',
            error.response?.data || error.message,
        );

        throw new Error(
            error.response?.data?.message ||
                'Failed to connect to the local API for deletion.',
        );
    }
};

export const fetchAllCollectionProgressForUser = async (userId: string) => {
    console.log(
        `fetch All Collection Progress for User: ${API_BASE_URL}/api/collection-progress`,
    );

    try {
        const response = await fetch(
            `${API_BASE_URL}/api/collection-progress`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ userId }),
            },
        );

        if (!response.ok) {
            // Throw an error if the HTTP status is not 2xx
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const collectionProgressRes = await response.json();

        return collectionProgressRes;
    } catch (error) {
        console.error(
            'Error fetching local Collection Progress for User:',
            error,
        );
        // Depending on your application's error handling, you might return an empty array or re-throw the error.
        throw new Error(
            'Failed to connect to the local API for Collection Progress data.',
        );
    }
};

export const fetchCollectionProgressForUserById = async (
    userId: string,
    collectionId: string,
) => {
    console.log(
        `fetch Collection Progress for User by ID: ${API_BASE_URL}/api/collection-progress/${collectionId}`,
    );

    try {
        const response = await fetch(
            `${API_BASE_URL}/api/collection-progress/${collectionId}`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ userId }),
            },
        );

        if (!response.ok) {
            // Throw an error if the HTTP status is not 2xx
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const collectionProgressRes = await response.json();

        return collectionProgressRes;
    } catch (error) {
        console.error(
            'Error fetching local Collection Progress for User by ID:',
            error,
        );
        // Depending on your application's error handling, you might return an empty array or re-throw the error.
        throw new Error(
            'Failed to connect to the local API for Collection Progress data by ID.',
        );
    }
};

export const updateCollectionProgressForUser = async (
    userId: string,
    collectionId: string,
    caughtCount?: number,
    totalCount?: number,
) => {
    console.log(
        `update Collection Progress for User: ${API_BASE_URL}/api/collection-progress`,
    );

    try {
        const response = await fetch(
            `${API_BASE_URL}/api/collection-progress`,
            {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    userId,
                    collectionId,
                    caughtCount,
                    totalCount,
                }),
            },
        );

        if (!response.ok) {
            // Throw an error if the HTTP status is not 2xx
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const updatedCollectionProgressRes = await response.json();

        return updatedCollectionProgressRes;
    } catch (error) {
        console.error(
            'Error updating local Collection Progress for User:',
            error,
        );
        // Depending on your application's error handling, you might return an empty array or re-throw the error.
        throw new Error(
            'Failed to connect to the local API to update Collection Progress data.',
        );
    }
};
