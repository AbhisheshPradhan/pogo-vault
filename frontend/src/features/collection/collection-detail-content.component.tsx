import { Collection } from './collection.component';
import { PageHeader } from '@features/ui';
import { useCollectionDetail } from './hooks/useCollectionDetail';

const CollectionDetailContent: React.FC<{ slug: string }> = ({ slug }) => {
    const { data: collectionData } = useCollectionDetail(slug);

    return (
        <>
            <PageHeader
                pageHeading={collectionData.name}
                pageDescription={collectionData.description}
            />
            <Collection
                collectionId={collectionData.id}
                pokemonList={collectionData.pokemonList || []}
                totalPokemonCount={collectionData.totalPokemonCount}
            />
        </>
    );
};
export { CollectionDetailContent };
