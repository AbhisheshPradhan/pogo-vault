import { AdminDashboard } from '@features/admin/admin-dashboard.component';
import { PageHeader, QueryBoundary } from '@features/ui';

export const AdminPage: React.FC = () => {
    return (
        <div className="px-4">
            <PageHeader
                pageHeading={'Admin Dashboard'}
                pageDescription={'Manage your Pokémon collection tracker'}
            />

            <QueryBoundary>
                <AdminDashboard />
            </QueryBoundary>
        </div>
    );
};
