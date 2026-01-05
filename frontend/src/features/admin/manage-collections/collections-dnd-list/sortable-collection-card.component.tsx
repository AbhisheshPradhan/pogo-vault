import React from 'react';
import { useSortable } from '@dnd-kit/sortable';

import { CSS } from '@dnd-kit/utilities';
import type { Collection } from '@shared/types';

interface SortableCollectionCardProps {
    collection: Collection;
    onEdit: (collection: Collection) => void;
    onToggleActive: (collection: Collection) => void;
}

export const SortableCollectionCard: React.FC<SortableCollectionCardProps> = ({
    collection,
    onEdit,
    onToggleActive,
}) => {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging,
    } = useSortable({ id: collection.id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.5 : 1,
    };

    return (
        <div
            style={style}
            className={`min-w-[400px] rounded-lg border bg-white p-4 shadow-sm transition-all dark:bg-gray-800 ${
                isDragging
                    ? 'cursor-grabbing border-blue-400'
                    : 'border-gray-200 dark:border-gray-700'
            } `}
            id={collection.id}
        >
            <div className="flex-start flex w-full flex-col">
                <div
                    className="w-full"
                    ref={setNodeRef}
                    {...attributes}
                    {...listeners}
                >
                    <div className="relative mb-4 flex items-start">
                        <div className="flex flex-1 items-start gap-3">
                            <div className="flex-1">
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                    {collection.name}
                                </h3>
                                <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                                    {collection.type}
                                </p>
                                <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                                    {collection.description}
                                </p>
                            </div>
                        </div>
                        <div
                            className={`absolute top-0 right-0 ml-2 rounded-full px-2 py-1 text-xs font-medium ${
                                collection.isActive
                                    ? 'bg-green-100 text-green-700'
                                    : 'bg-gray-100 text-gray-700'
                            }`}
                        >
                            {collection.isActive ? 'Active' : 'Inactive'}
                        </div>
                    </div>
                    {/* Filters Preview */}
                    <div className="mb-4">
                        <p className="mb-2 text-xs font-medium text-gray-500 uppercase dark:text-gray-400">
                            Filters ({collection.filters.length})
                        </p>
                        <div className="space-y-1">
                            {collection.filters.map((filter, idx) => (
                                <div
                                    key={idx}
                                    className="rounded bg-gray-50 px-2 py-1 text-xs text-gray-700 dark:bg-gray-700 dark:text-gray-300"
                                >
                                    <span className="font-mono">
                                        {filter.field} {filter.operator}{' '}
                                        {filter.value.toString()}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="w-full">
                    {/* Actions */}
                    <div className="flex gap-2">
                        <button
                            onClick={() => onEdit(collection)}
                            className="flex-1 cursor-pointer rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700"
                        >
                            Edit
                        </button>
                        <button
                            onClick={() => onToggleActive(collection)}
                            className={`flex-1 cursor-pointer rounded-lg px-4 py-2 text-sm font-medium ${
                                collection.isActive
                                    ? 'bg-red-100 text-red-700 hover:bg-red-200'
                                    : 'bg-green-100 text-green-700 hover:bg-green-200'
                            }`}
                        >
                            {collection.isActive ? 'Deactivate' : 'Activate'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
