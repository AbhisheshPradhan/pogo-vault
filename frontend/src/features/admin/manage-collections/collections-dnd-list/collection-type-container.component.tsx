import React from 'react';
import {
    horizontalListSortingStrategy,
    SortableContext,
} from '@dnd-kit/sortable';
import type { Collection } from '@shared/types';
import { SortableCollectionCard } from './sortable-collection-card.component';
import { useAdminCollections } from '../hooks/useAdminCollections';

interface CollectionTypeContainerProps {
    collectionTypeKey: string;
    openEditModal: (collection: Collection) => void;
    toggleActive: (collection: Collection) => void;
}

export const CollectionTypeContainer: React.FC<
    CollectionTypeContainerProps
> = ({ collectionTypeKey, openEditModal, toggleActive }) => {
    const { isLoading, collectionList } = useAdminCollections();
    return (
        <SortableContext
            id={collectionTypeKey}
            items={collectionList}
            strategy={horizontalListSortingStrategy}
        >
            <div className="flex min-h-[150px] w-full flex-row gap-3">
                {!isLoading &&
                    collectionList
                        .filter((c) => c.type === collectionTypeKey)
                        .map((collection: Collection) => (
                            <SortableCollectionCard
                                key={collection.id}
                                collection={collection}
                                onEdit={openEditModal}
                                onToggleActive={toggleActive}
                            />
                        ))}
            </div>
        </SortableContext>
    );
};
