import React from 'react';
import {
    DndContext,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors,
    MeasuringStrategy,
    closestCorners,
} from '@dnd-kit/core';
import { arrayMove, sortableKeyboardCoordinates } from '@dnd-kit/sortable';

import { COLLECTION_TYPES, type Collection } from '@shared/types';
import { useAdminCollections } from '../hooks/useAdminCollections';
import { CollectionTypeContainer } from './collection-type-container.component';

interface CollectionsDnDListProps {
    openEditModal: (collection: Collection) => void;
    toggleActive: (collection: Collection) => void;
}

export const CollectionsDnDList: React.FC<CollectionsDnDListProps> = ({
    openEditModal,
    toggleActive,
}) => {
    const { collectionList, reorder } = useAdminCollections();

    // DnD Kit sensors
    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        }),
    );

    const handleDragEnd = (event: any) => {
        const { active, over } = event;

        if (active && over && active.id !== over.id) {
            const oldIndex = collectionList.findIndex(
                (c) => c.id === active.id,
            );
            const newIndex = collectionList.findIndex((c) => c.id === over.id);

            const reorderedList = arrayMove(collectionList, oldIndex, newIndex);
            const orderedIds = reorderedList.map((col) => col.id);

            reorder(orderedIds);
        }
    };

    return (
        <DndContext
            sensors={sensors}
            collisionDetection={closestCorners}
            measuring={{
                droppable: {
                    strategy: MeasuringStrategy.Always,
                },
            }}
            onDragEnd={handleDragEnd}
        >
            <div className="flex flex-col gap-6 pb-4">
                {Object.keys(COLLECTION_TYPES).map((typeKey) => {
                    return (
                        <div key={typeKey} className="w-full flex-1 rounded-xl">
                            <div className="mb-4 flex w-full">
                                <h3 className="mb-4 font-bold">
                                    {COLLECTION_TYPES[typeKey].label}
                                </h3>
                            </div>

                            <CollectionTypeContainer
                                collectionTypeKey={typeKey}
                                openEditModal={openEditModal}
                                toggleActive={toggleActive}
                            />
                        </div>
                    );
                })}
            </div>
        </DndContext>
    );
};
