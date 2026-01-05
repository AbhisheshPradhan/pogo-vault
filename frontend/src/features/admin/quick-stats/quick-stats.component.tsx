export const QuickStats: React.FC = () => {
    return (
        <div className="rounded-lg border border-gray-200 bg-gradient-to-br from-blue-50 to-indigo-50 p-6 dark:border-gray-700 dark:from-gray-800 dark:to-gray-800">
            <div className="mb-4">
                <div className="text-2xl">📊</div>
            </div>
            <h2 className="mb-2 text-xl font-semibold text-gray-900 dark:text-white">
                Quick Stats
            </h2>
            <div className="space-y-2">
                <div className="flex justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">
                        Total Pokémon
                    </span>
                    <span className="font-semibold text-gray-900 dark:text-white">
                        1,025
                    </span>
                </div>
                <div className="flex justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">
                        Available in GO
                    </span>
                    <span className="font-semibold text-gray-900 dark:text-white">
                        856
                    </span>
                </div>
                <div className="flex justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">
                        Active Collections
                    </span>
                    <span className="font-semibold text-gray-900 dark:text-white">
                        9
                    </span>
                </div>
            </div>
        </div>
    );
};
