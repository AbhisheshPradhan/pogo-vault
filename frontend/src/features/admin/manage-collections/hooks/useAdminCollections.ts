import {
    useMutation,
    useQueryClient,
    useSuspenseQuery,
} from '@tanstack/react-query';

import {
    createCollection,
    updateCollection,
    updateCollectionsOrder,
    fetchAllCollections,
} from '@services/adminService';
import { collectionKeys } from '@services/queryKeys';
import type {
    Collection,
    CollectionCreateInput,
    CollectionUpdateInput,
} from '@shared/types';

export const useAdminCollections = () => {
    const queryClient = useQueryClient();

    // This is the specific "address" for the admin list
    const ADMIN_LIST_KEY = collectionKeys.adminList();

    // 1. DATA FETCHING
    const query = useSuspenseQuery({
        queryKey: ADMIN_LIST_KEY,
        queryFn: async () => {
            const response = await fetchAllCollections();
            return response.collectionList;
        },
        staleTime: 1000 * 30, // Data is fresh for 30 seconds
    });

    // 2. SAVE/CREATE MUTATION
    const saveMutation = useMutation({
        mutationFn: async (
            data: Collection | CollectionCreateInput | CollectionUpdateInput,
        ) => {
            if ('id' in data && data.id) {
                return await updateCollection(data.id, data);
            }
            return await createCollection(data as CollectionCreateInput);
        },
        onMutate: async (newData) => {
            // Cancel outgoing refetches so they don't overwrite our optimistic update
            await queryClient.cancelQueries({ queryKey: ADMIN_LIST_KEY });

            // Snapshot the previous value
            const previousCollections =
                queryClient.getQueryData<Collection[]>(ADMIN_LIST_KEY);

            // Optimistically update the cache
            if (previousCollections) {
                queryClient.setQueryData<Collection[]>(
                    ADMIN_LIST_KEY,
                    (old) => {
                        if (!old) return [];

                        // If it's an update, find and replace
                        if ('id' in newData) {
                            return old.map((col) =>
                                col.id === newData.id
                                    ? { ...col, ...newData }
                                    : col,
                            );
                        }

                        // Create: Generate a truly unique temp ID
                        const optimisticItem = {
                            ...newData,
                            id: `temp-${crypto.randomUUID()}`, // Unique every time
                        } as Collection;

                        return [optimisticItem, ...old];
                    },
                );
            }

            return { previousCollections };
        },
        onError: (err, _, context) => {
            // Roll back to the previous state if the server fails
            if (context?.previousCollections) {
                queryClient.setQueryData(
                    ADMIN_LIST_KEY,
                    context.previousCollections,
                );
            }
            console.error('Save failed:', err);
        },
        onSettled: () => {
            // Refresh EVERYTHING related to collections to ensure public/admin sync
            queryClient.invalidateQueries({ queryKey: collectionKeys.all });
        },
    });

    // 3. REORDER MUTATION
    const reorderMutation = useMutation({
        mutationFn: async (ids: string[]) => {
            return await updateCollectionsOrder(ids);
        },
        onMutate: async (ids) => {
            await queryClient.cancelQueries({ queryKey: ADMIN_LIST_KEY });
            const previousCollections =
                queryClient.getQueryData<Collection[]>(ADMIN_LIST_KEY);

            if (previousCollections) {
                // Perform the sort optimistically
                const sortedCollections = [...previousCollections]
                    .sort((a, b) => ids.indexOf(a.id) - ids.indexOf(b.id))
                    .map((col, index) => ({ ...col, order: index }));

                queryClient.setQueryData<Collection[]>(
                    ADMIN_LIST_KEY,
                    sortedCollections,
                );
            }

            return { previousCollections };
        },
        onError: (err, _, context) => {
            if (context?.previousCollections) {
                queryClient.setQueryData(
                    ADMIN_LIST_KEY,
                    context.previousCollections,
                );
            }
        },
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: collectionKeys.all });
        },
    });

    // 4. CLEAN RETURN OBJECT
    return {
        // With Suspense, data is guaranteed to be defined here
        collectionList: query.data,
        collectionListCount: query.data.length,

        // Status states
        isSaving: saveMutation.isPending || reorderMutation.isPending,
        isReordering: reorderMutation.isPending,

        // Actions
        save: saveMutation.mutate,
        reorder: reorderMutation.mutate,

        // Errors (optional but helpful for toasts)
        error: saveMutation.error || reorderMutation.error,
    };
};
