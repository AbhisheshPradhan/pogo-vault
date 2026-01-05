import { Breadcrumbs } from '../breadcrumbs/breadcrumbs.component';

interface PageHeaderProps {
    pageHeading: string;
    pageDescription?: string;
}

export const PageHeader: React.FC<PageHeaderProps> = ({
    pageHeading,
    pageDescription,
}) => {
    return (
        <div className="flex flex-col">
            <Breadcrumbs />
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight dark:text-white">
                    {pageHeading}
                </h1>

                {pageDescription && (
                    <p className="mt-2 text-gray-600 dark:text-gray-400">
                        {pageDescription}
                    </p>
                )}
            </div>
        </div>
    );
};
