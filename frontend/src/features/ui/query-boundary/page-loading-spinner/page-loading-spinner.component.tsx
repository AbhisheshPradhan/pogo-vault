export const PageLoadingSpinner: React.FC = () => (
    // Center the spinner on the screen
    <div className="mt-75 flex items-center justify-center">
        <div
            className="h-12 w-12 animate-spin rounded-full border-4 border-t-4 border-indigo-500 border-t-transparent ease-linear"
            role="status"
            aria-label="loading"
        ></div>
        <span className="ml-3 text-lg font-medium text-gray-700 dark:text-gray-300">
            Contacting Professor Oak...
        </span>
    </div>
);
