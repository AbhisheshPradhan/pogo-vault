import React from 'react';
import { CollectionsList } from '@features/collection-list';
import { PageHeader, QueryBoundary } from '@features/ui';

export const CollectionsListPage: React.FC = () => {
    return (
        <div className="px-4">
            <PageHeader pageHeading="Collections" />

            <div className="py-2 sm:py-4">
                <QueryBoundary>
                    <CollectionsList />
                </QueryBoundary>
            </div>
        </div>
    );
};
