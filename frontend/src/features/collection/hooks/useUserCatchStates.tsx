import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { userKeys } from '@services/queryKeys';
import {
    fetchAllCatchStatesForUser,
    deleteAllCatchStatesForUser,
    toggleUserCatchStates,
} from '@services/userService';

export const useUserCatchStatesData = (userId?: string) => {
    const QUERY_KEY = userKeys.catchStates(userId || 'anonymous');

    return useQuery({
        queryKey: QUERY_KEY,
        queryFn: () => fetchAllCatchStatesForUser(userId!),
        enabled: !!userId,
        select: (data: string[]) => new Set(data),
        staleTime: Infinity,
    });
};

export const useUserCatchStatesActions = (userId?: string) => {
    const queryClient = useQueryClient();
    const QUERY_KEY = userKeys.catchStates(userId || 'anonymous');

    // 2. TOGGLE MUTATION (Optimistic)
    const toggleCatchMutation = useMutation({
        mutationFn: ({
            pokemonId,
            collectionId,
        }: {
            pokemonId: string;
            collectionId: string;
        }) => toggleUserCatchStates(pokemonId, userId!, collectionId),

        onMutate: async ({ pokemonId }) => {
            await queryClient.cancelQueries({ queryKey: QUERY_KEY });
            const previousStates =
                queryClient.getQueryData<Set<string>>(QUERY_KEY);

            queryClient.setQueryData(
                QUERY_KEY,
                (oldSet: Set<string> | undefined) => {
                    const newSet = new Set(oldSet);
                    if (newSet.has(pokemonId)) {
                        newSet.delete(pokemonId);
                    } else {
                        newSet.add(pokemonId);
                    }
                    return newSet;
                },
            );

            return { previousStates };
        },
        onSuccess: (newCaughtIds: string[]) => {
            // Server returns updated array; sync it back as a Set
            queryClient.setQueryData(QUERY_KEY, new Set(newCaughtIds));
        },
        onError: (err, _, context) => {
            if (context?.previousStates) {
                queryClient.setQueryData(QUERY_KEY, context.previousStates);
            }
        },
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: QUERY_KEY });
        },
    });

    // 3. RESET MUTATION (Optimistic)
    const resetMutation = useMutation({
        mutationFn: () => deleteAllCatchStatesForUser(userId!),
        onMutate: async () => {
            await queryClient.cancelQueries({ queryKey: QUERY_KEY });
            const previousStates =
                queryClient.getQueryData<Set<string>>(QUERY_KEY);

            // Optimistically clear the UI
            queryClient.setQueryData(QUERY_KEY, new Set());

            return { previousStates };
        },
        onError: (err, _, context) => {
            if (context?.previousStates) {
                queryClient.setQueryData(QUERY_KEY, context.previousStates);
            }
        },
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: QUERY_KEY });
        },
    });

    return {
        toggleCatchState: toggleCatchMutation.mutate,
        isToggling: toggleCatchMutation.isPending,
        resetCatchStates: resetMutation.mutate,
        isResetting: resetMutation.isPending,
    };
};
