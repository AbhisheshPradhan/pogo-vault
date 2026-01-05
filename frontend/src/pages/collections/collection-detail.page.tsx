import React from 'react';
import { useParams } from 'react-router-dom';

import { QueryBoundary } from '@features/ui';
import { CollectionDetailContent } from '@features/collection/collection-detail-content.component';

export const CollectionDetailPage: React.FC = () => {
    const { slug } = useParams<{ slug: string }>();

    return (
        <div className="px-4">
            <QueryBoundary>
                <CollectionDetailContent slug={slug!} />
            </QueryBoundary>
        </div>
    );
};
