import React, { useCallback } from 'react';

import { PokemonCard } from './pokemon-card';

import { CollectionFilters } from './collection-filters/collection-filters.component';
import type { Pokemon } from '@shared/types';
import { useAuth } from '@features/auth/context/auth.context';
import {
    useUserCatchStatesActions,
    useUserCatchStatesData,
} from './hooks/useUserCatchStates';
import { SearchBox } from '@features/ui';

interface CollectionProps {
    collectionId: string;
    pokemonList: Pokemon[];
    totalPokemonCount: number;
}

export const Collection: React.FC<CollectionProps> = ({
    pokemonList = [],
    collectionId,
}) => {
    const { userId } = useAuth();
    const { data: userCaughtPokemonIds } = useUserCatchStatesData(userId);

    const { toggleCatchState } = useUserCatchStatesActions(userId);

    console.log('Collection collectionId', collectionId);

    const handleToggleCatchState = useCallback(
        (id: string) => {
            if (userId && collectionId)
                toggleCatchState({ pokemonId: id, collectionId: collectionId });
        },
        [toggleCatchState, userId, collectionId],
    );

    return (
        <>
            <div className="row mb-2 flex flex-wrap items-center pt-4 md:mb-4">
                <div className="mb-2 w-full sm:mr-4 sm:w-100 md:mb-0">
                    <SearchBox searchTerm={''} setSearchTerm={null} />
                </div>
                <div>
                    <CollectionFilters />
                </div>
            </div>
            <div className="py-2 sm:py-4">
                <div className="grid grid-cols-3 gap-4 md:grid-cols-6 md:gap-4 lg:grid-cols-9">
                    {pokemonList.map((pokemon) => (
                        <PokemonCard
                            key={pokemon.id}
                            pokemon={pokemon}
                            isCaught={
                                userCaughtPokemonIds instanceof Set
                                    ? userCaughtPokemonIds.has(pokemon.id)
                                    : Array.isArray(userCaughtPokemonIds)
                                      ? (
                                            userCaughtPokemonIds as string[]
                                        ).includes(pokemon.id)
                                      : false
                            }
                            onToggleCatchState={handleToggleCatchState}
                        />
                    ))}
                </div>
            </div>
        </>
    );
};
