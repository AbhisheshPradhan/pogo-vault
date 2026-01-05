import { PageHeader, QueryBoundary } from '@features/ui';
import { ManageCollections } from '@features/admin/manage-collections';

export const ManageCollectionsPage = () => {
    return (
        <div className="px-4">
            <PageHeader
                pageHeading="Manage Collections"
                pageDescription={'Configure Collections.'}
            />

            <QueryBoundary>
                <ManageCollections />
            </QueryBoundary>
        </div>
    );
};
