import { useSuspenseQuery } from '@tanstack/react-query';
import { fetchPokemonsForActiveCollection } from '@services/collectionService';
import { collectionKeys } from '@services/queryKeys';

export const useCollectionDetail = (slug: string) => {
    return useSuspenseQuery({
        queryKey: collectionKeys.pokemons(slug),
        queryFn: () => fetchPokemonsForActiveCollection(slug),
    });
};
