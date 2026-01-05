import {
    type Collection,
    type CollectionType,
    type CollectionCreateInput,
    COLLECTION_TYPES,
    type CollectionUpdateInput,
} from '@shared/types';
import { generateSlug } from '@utils/slug';

interface CollectionModalProps {
    selectedCollection:
        | Collection
        | CollectionCreateInput
        | CollectionUpdateInput;
    setSelectedCollection: (
        collection: Collection | CollectionCreateInput | CollectionUpdateInput,
    ) => void;
    addFilter: () => void;
    updateFilter: (index: number, key: string, value: any) => void;
    removeFilter: (index: number) => void;
    closeModal: () => void;
    saveCollection: () => void;
    isSaving: boolean;
}

export const CollectionModal: React.FC<CollectionModalProps> = ({
    selectedCollection,
    setSelectedCollection,
    addFilter,
    updateFilter,
    removeFilter,
    closeModal,
    saveCollection,
    isSaving,
}) => {
    // Determine if we are in "Create" or "Edit" mode
    const isEditMode = !!selectedCollection.id;
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
            <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-lg bg-white p-6 shadow-xl dark:bg-gray-800">
                <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">
                    {isEditMode
                        ? `Edit Collection: ${selectedCollection.name}`
                        : 'Create New Collection'}
                </h2>

                {/* Basic Info */}
                <div className="mb-6 space-y-4">
                    <div>
                        <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Collection Name
                        </label>
                        <input
                            type="text"
                            value={selectedCollection.name}
                            onChange={(e) =>
                                setSelectedCollection({
                                    ...selectedCollection,
                                    name: e.target.value,
                                })
                            }
                            className="w-full cursor-text rounded-lg border border-gray-300 px-4 py-2 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                        />
                        <span className="text-sm">
                            (URL Slug: {generateSlug(selectedCollection.name)})
                        </span>
                    </div>

                    <div>
                        <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Description
                        </label>
                        <textarea
                            value={selectedCollection.description}
                            onChange={(e) =>
                                setSelectedCollection({
                                    ...selectedCollection,
                                    description: e.target.value,
                                })
                            }
                            rows={2}
                            className="w-full cursor-text rounded-lg border border-gray-300 px-4 py-2 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                        />
                    </div>

                    <div>
                        <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Collection Type
                        </label>
                        <select
                            value={selectedCollection.type}
                            onChange={(e) =>
                                setSelectedCollection({
                                    ...selectedCollection,
                                    type: e.target.value as CollectionType,
                                })
                            }
                            className="w-full cursor-pointer rounded-lg border border-gray-300 px-4 py-2 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                        >
                            {Object.entries(COLLECTION_TYPES).map(
                                ([key, { label }]) => (
                                    <option key={key} value={key}>
                                        {label}
                                    </option>
                                ),
                            )}
                        </select>
                    </div>
                </div>

                {/* Filters Section */}
                <div className="mb-6">
                    <div className="mb-3 flex items-center justify-between">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                            Filters
                        </h3>
                        <button
                            onClick={addFilter}
                            className="cursor-pointer rounded-lg bg-green-600 px-3 py-1 text-sm font-medium text-white hover:bg-green-700"
                        >
                            + Add Filter
                        </button>
                    </div>

                    <div className="space-y-3">
                        {selectedCollection.filters.map((filter, idx) => (
                            <div
                                key={idx}
                                className="flex items-center gap-2 rounded-lg border border-gray-200 bg-gray-50 p-3 dark:border-gray-700 dark:bg-gray-900"
                            >
                                <select
                                    value={filter.field}
                                    onChange={(e) =>
                                        updateFilter(
                                            idx,
                                            'field',
                                            e.target.value,
                                        )
                                    }
                                    className="flex-1 cursor-pointer rounded border border-gray-300 px-2 py-1 text-sm dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                                >
                                    <option value="">Select Field</option>
                                    <option value="isShiny">isShiny</option>
                                    <option value="isShadow">isShadow</option>
                                    <option value="gen">generation</option>
                                    <option value="region">region</option>
                                    <option value="isMega">isMega</option>
                                    <option value="isGmax">isGmax</option>
                                    <option value="isRegional">
                                        isRegional
                                    </option>
                                    <option value="isFemaleForm">
                                        isFemaleForm
                                    </option>
                                    <option value="type1">Primary Type</option>
                                    <option value="type2">
                                        Secondary Type
                                    </option>
                                    <option value="eventExclusive">
                                        eventExclusive
                                    </option>
                                </select>

                                <select
                                    value={filter.operator}
                                    onChange={(e) =>
                                        updateFilter(
                                            idx,
                                            'operator',
                                            e.target.value,
                                        )
                                    }
                                    className="cursor-pointer rounded border border-gray-300 px-2 py-1 text-sm dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                                >
                                    <option value="equals">equals</option>
                                    <option value="notEquals">
                                        not equals
                                    </option>
                                    <option value="contains">contains</option>
                                </select>

                                <input
                                    type="text"
                                    value={filter.value.toString()}
                                    onChange={(e) => {
                                        const val = e.target.value;
                                        updateFilter(
                                            idx,
                                            'value',
                                            val === 'true'
                                                ? true
                                                : val === 'false'
                                                  ? false
                                                  : val,
                                        );
                                    }}
                                    placeholder="Value"
                                    className="flex-1 cursor-text rounded border border-gray-300 px-2 py-1 text-sm dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                                />

                                <button
                                    onClick={() => removeFilter(idx)}
                                    className="cursor-pointer rounded bg-red-600 px-3 py-1 text-sm text-white hover:bg-red-700"
                                >
                                    ✕
                                </button>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Modal Actions */}
                <div className="flex gap-3">
                    <button
                        onClick={closeModal}
                        className="flex-1 cursor-pointer rounded-lg border border-gray-300 px-4 py-2 font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={saveCollection}
                        disabled={isSaving}
                        className={`flex flex-1 items-center justify-center gap-2 rounded-lg px-4 py-2 font-medium text-white transition-colors ${
                            isSaving
                                ? 'cursor-not-allowed bg-blue-400'
                                : 'cursor-pointer bg-blue-600 hover:bg-blue-700'
                        }`}
                    >
                        {isSaving && (
                            <svg
                                className="h-4 w-4 animate-spin text-white"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                            >
                                <circle
                                    className="opacity-25"
                                    cx="12"
                                    cy="12"
                                    r="10"
                                    stroke="currentColor"
                                    strokeWidth="4"
                                ></circle>
                                <path
                                    className="opacity-75"
                                    fill="currentColor"
                                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                ></path>
                            </svg>
                        )}
                        {isSaving
                            ? 'Saving...'
                            : isEditMode
                              ? 'Save Changes'
                              : 'Create Collection'}
                    </button>
                </div>
            </div>
        </div>
    );
};
