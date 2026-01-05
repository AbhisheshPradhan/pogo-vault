import { useSuspenseQuery } from '@tanstack/react-query';
import { fetchActiveCollections } from '@services/collectionService';
import { collectionKeys } from '@services/queryKeys';

export const useCollections = () => {
    return useSuspenseQuery({
        queryKey: collectionKeys.lists(),
        queryFn: fetchActiveCollections,
        staleTime: 1000 * 60 * 5,
    });
};
