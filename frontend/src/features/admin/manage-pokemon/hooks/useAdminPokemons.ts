import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import {
    fetchAllPokemons,
    updateAvailabilityInPogo,
} from '@services/adminService';
import { pokemonKeys } from '@services/queryKeys';
import type { Pokemon } from '@shared/types';

export const useAdminPokemons = () => {
    const queryKey = pokemonKeys.adminAll();
    const queryClient = useQueryClient();

    const query = useQuery({
        queryKey,
        queryFn: async () => {
            const response = await fetchAllPokemons();
            return response.pokemonList;
        },
        staleTime: 1000 * 30,
    });

    const togglePogoAvailabilityMutation = useMutation({
        mutationFn: async (pokemonId: string) => {
            if (!pokemonId) throw new Error('Pokemon id must be defined');
            const response = await updateAvailabilityInPogo(pokemonId);
            return response.pokemon;
        },

        onMutate: async (pokemonId: string) => {
            await queryClient.cancelQueries({ queryKey });
            const previousStates =
                queryClient.getQueryData<Pokemon[]>(queryKey);

            // Optimistically update the cache
            queryClient.setQueryData<Pokemon[]>(queryKey, (oldList) => {
                if (!oldList) return [];

                return oldList.map((pokemon) =>
                    pokemon.id === pokemonId
                        ? {
                              ...pokemon,
                              availableInPogo: !pokemon.availableInPogo,
                          }
                        : pokemon,
                );
            });

            return { previousStates };
        },

        // Solidify the truth from the server
        onSuccess: (updatedPokemonFromServer: Pokemon) => {
            queryClient.setQueryData<Pokemon[]>(queryKey, (oldList) => {
                if (!oldList) return [updatedPokemonFromServer];
                return oldList.map((p) =>
                    p.id === updatedPokemonFromServer.id
                        ? updatedPokemonFromServer
                        : p,
                );
            });
        },

        onError: (err, _, context) => {
            if (context?.previousStates) {
                queryClient.setQueryData(queryKey, context.previousStates);
            }
        },

        onSettled: (_, error) => {
            if (error) {
                queryClient.invalidateQueries({ queryKey });
            }
        },
    });

    return {
        pokemonList: query.data ?? [],
        totalPokemonCount: query.data?.length ?? 0,
        isLoading: query.isLoading,
        toggleAvailability: togglePogoAvailabilityMutation.mutate,
        isTogglePending: togglePogoAvailabilityMutation.isPending,
    };
};
