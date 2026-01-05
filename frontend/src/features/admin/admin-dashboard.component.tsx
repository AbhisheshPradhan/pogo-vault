import { Link } from 'react-router-dom';

import { useAdminCollections } from '@features/admin/manage-collections/hooks/useAdminCollections';
import { QuickStats } from '@features/admin/quick-stats';
import { RecentActivity } from '@features/admin/recent-activity/recent-activity.component';

export const AdminDashboard: React.FC = () => {
    const { collectionListCount } = useAdminCollections();

    const adminSections = [
        {
            title: 'Manage Pokémon',
            description:
                'Toggle availability of Pokémon variants in Pokémon GO',
            icon: '📦',
            path: '/admin/pokemon',
            stats: '1,000+ variants',
        },
        {
            title: 'Manage Collections',
            description:
                'Configure collection types, filters, and availability',
            icon: '📚',
            path: '/admin/collections',
            stats: `${collectionListCount} collections`,
        },
    ];

    return (
        <>
            {/* Admin Sections Grid */}
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {adminSections.map((section) => (
                    <Link
                        key={section.path}
                        to={section.path}
                        className="group rounded-lg border border-gray-200 bg-white p-6 shadow-sm transition-all hover:border-indigo-700 hover:shadow-md dark:border-gray-700 dark:bg-gray-800"
                    >
                        <div className="mb-4 flex items-start justify-between">
                            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100 text-2xl dark:bg-blue-900">
                                {section.icon}
                            </div>
                            <svg
                                className="h-5 w-5 text-gray-400 transition-transform group-hover:translate-x-1 dark:text-gray-500"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M9 5l7 7-7 7"
                                />
                            </svg>
                        </div>

                        <h2 className="mb-2 text-xl font-semibold text-gray-900 dark:text-white">
                            {section.title}
                        </h2>

                        <p className="mb-4 text-sm text-gray-600 dark:text-gray-400">
                            {section.description}
                        </p>

                        <div className="text-xs font-medium text-blue-600 dark:text-blue-400">
                            {section.stats}
                        </div>
                    </Link>
                ))}

                {/* Quick Stats Card */}
                <QuickStats />
            </div>

            {/* Recent Activity Section */}
            <RecentActivity />
        </>
    );
};
