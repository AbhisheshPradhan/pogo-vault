import React, { useState } from 'react';

import { CollectionModal } from './collections-dnd-list/collection-modal.component';
import { CollectionsDnDList } from './collections-dnd-list/collections-dnd-list.component';

import { useAdminCollections } from './hooks/useAdminCollections';
import {
    CollectionTypeValue,
    type Collection,
    type CollectionCreateInput,
} from '@shared/types';

const EMPTY_COLLECTION: CollectionCreateInput = {
    name: '',
    description: '',
    type: CollectionTypeValue.CUSTOM,
    filters: [],
};

export const ManageCollections: React.FC = () => {
    console.log('ManageCollections rendered');
    const { save, isSaving } = useAdminCollections();

    const [selectedCollection, setSelectedCollection] = useState<
        Collection | CollectionCreateInput
    >(EMPTY_COLLECTION);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const toggleActive = (collection: Collection) => {
        if (collection) {
            save({ ...collection, isActive: !collection.isActive });
        }
    };

    const openEditModal = (collection: Collection) => {
        setSelectedCollection({ ...collection });
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setSelectedCollection(EMPTY_COLLECTION);
        setIsModalOpen(false);
    };

    const addFilter = () => {
        if (selectedCollection) {
            setSelectedCollection({
                ...selectedCollection,
                filters: [
                    ...selectedCollection.filters,
                    { field: 'isShiny', operator: 'equals', value: false },
                ],
            });
        }
    };

    const updateFilter = (index: number, key: string, value: any) => {
        if (selectedCollection) {
            const newFilters = [...selectedCollection.filters];
            newFilters[index] = { ...newFilters[index], [key]: value };
            setSelectedCollection({
                ...selectedCollection,
                filters: newFilters,
            });
        }
    };

    const removeFilter = (index: number) => {
        if (selectedCollection) {
            setSelectedCollection({
                ...selectedCollection,
                filters: selectedCollection.filters.filter(
                    (_, i) => i !== index,
                ),
            });
        }
    };

    const saveCollection = () => {
        if (selectedCollection) {
            save(selectedCollection, {
                onSuccess: () => {
                    closeModal();
                },
            });
        }
    };

    const handleAddNew = () => {
        setSelectedCollection({ ...EMPTY_COLLECTION });
        setIsModalOpen(true);
    };

    return (
        <>
            <div className="mb-4 flex w-full">
                <button
                    onClick={() => handleAddNew()}
                    className="ml-auto cursor-pointer rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700"
                >
                    Add New Collection
                </button>
            </div>

            {/* Collections List with Drag & Drop */}
            <CollectionsDnDList
                openEditModal={openEditModal}
                toggleActive={toggleActive}
            />

            {/* Edit Modal */}
            {isModalOpen && (
                <CollectionModal
                    selectedCollection={selectedCollection}
                    setSelectedCollection={setSelectedCollection}
                    addFilter={addFilter}
                    updateFilter={updateFilter}
                    removeFilter={removeFilter}
                    closeModal={closeModal}
                    saveCollection={saveCollection}
                    isSaving={isSaving}
                />
            )}
        </>
    );
};
