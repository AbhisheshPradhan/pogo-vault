interface ResourceLoadErrorProps {
    isLoading: boolean;
    refetch: () => void;
    title?: string;
    message?: string;
}

export const ResourceLoadError: React.FC<ResourceLoadErrorProps> = ({
    isLoading,
    refetch,
    title = 'Resource Not Found',
    message = "We couldn't find what you're looking for.",
}) => {
    return (
        <div className="flex min-h-[50vh] flex-col items-center justify-center space-y-4">
            <div className="text-center">
                <h2 className="mb-2 text-xl font-bold text-gray-800 dark:text-white">
                    {title}
                </h2>
                <p className="text-gray-500">{message}</p>
            </div>

            <button
                onClick={() => refetch()}
                className="flex cursor-pointer items-center gap-2 rounded-lg bg-indigo-600 px-6 py-2 text-white transition-colors hover:bg-indigo-700"
            >
                {isLoading ? (
                    <>
                        <div
                            className="h-4 w-4 animate-spin rounded-full border-4 border-t-4 border-indigo-500 border-t-transparent ease-linear"
                            role="status"
                            aria-label="loading"
                        ></div>
                        Refreshing...
                    </>
                ) : null}
                Try Refreshing
            </button>
        </div>
    );
};
