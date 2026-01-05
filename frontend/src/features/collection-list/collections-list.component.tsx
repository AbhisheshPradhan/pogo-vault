import React from 'react';
import { Link } from 'react-router-dom';

import { CollectionCard } from './collection-card';
import { COLLECTION_TYPES, type Collection } from '@shared/types';
import { useCollections } from './hooks/useCollections';

export const CollectionsList: React.FC = () => {
    const { data } = useCollections();

    const groupedCollections = data.collectionList.reduce(
        (acc, collection) => {
            const type = collection.type;
            if (!acc[type]) {
                acc[type] = [];
            }
            acc[type].push(collection);
            return acc;
        },
        {} as Record<string, Collection[]>,
    );

    // 2. Define the order you want the types to appear in the UI
    const typeOrder = Object.keys(
        COLLECTION_TYPES,
    ) as (keyof typeof COLLECTION_TYPES)[];

    return (
        <div className="flex flex-col gap-8">
            {typeOrder.map((typeKey) => {
                const group = groupedCollections[typeKey];

                // Only render the section if there are collections in it
                if (!group || group.length === 0) return null;

                const config = COLLECTION_TYPES[typeKey];

                return (
                    <section key={typeKey} className="flex flex-col gap-4">
                        {/* Section Heading */}
                        <div className="flex items-center gap-3">
                            <h2 className="text-xl font-bold dark:text-white">
                                {config.label}
                            </h2>
                            {/* <span
                                className={`h-1 flex-1 rounded-full bg-${config.color}-500 opacity-20`}
                            /> */}
                            {/* <span className="text-sm font-medium text-gray-500">
                                {group.length}
                            </span> */}
                        </div>

                        {/* Grid of Cards */}
                        <div className="grid w-full grid-cols-1 gap-4 lg:grid-cols-3">
                            {group.map((collection) => (
                                <Link
                                    to={`/collections/${collection.slug}`}
                                    className="block transition-transform hover:scale-[1.01]"
                                    key={collection.id}
                                    state={{
                                        pageHeading: collection.name,
                                        slug: collection.slug,
                                    }}
                                >
                                    <CollectionCard
                                        collectionType={collection}
                                    />
                                </Link>
                            ))}
                        </div>
                    </section>
                );
            })}
        </div>
    );
};
