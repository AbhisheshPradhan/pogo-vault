interface QueryErrorStateProps {
    title?: string;
    message?: string;
    error?: Error;
    resetErrorBoundary?: () => void;
}

export const QueryErrorState: React.FC<QueryErrorStateProps> = ({
    title = 'Resource Not Found',
    message = "We couldn't find what you're looking for.",
    error,
    resetErrorBoundary,
}) => {
    return (
        <div className="flex min-h-[40vh] flex-col items-center justify-center space-y-4">
            <div className="text-center">
                <h2 className="mb-2 text-xl font-bold text-gray-800 dark:text-white">
                    {title}
                </h2>
                {/* Use the actual error message if it exists, otherwise the default */}
                <p className="text-gray-500">{error?.message || message}</p>
            </div>

            {resetErrorBoundary && (
                <button
                    onClick={resetErrorBoundary}
                    className="flex cursor-pointer items-center gap-2 rounded-lg bg-indigo-600 px-6 py-3 font-medium text-white transition-colors hover:bg-indigo-700"
                >
                    Try Refreshing
                </button>
            )}
        </div>
    );
};
