import React from 'react';

export const Footer: React.FC = () => {
    // Get the current year dynamically
    const currentYear = new Date().getFullYear();

    return (
        <footer className="mt-30 min-h-50 bg-gray-200 py-4 text-gray-700 dark:bg-gray-800 dark:text-gray-400">
            <div className="mx-auto flex max-w-7xl flex-col items-center justify-between px-4 text-sm sm:flex-row sm:px-6 lg:px-8">
                <p className="order-2 mt-2 sm:order-1 sm:mt-0">
                    &copy; {currentYear} **Your Company Name**. All rights
                    reserved.
                </p>

                <div className="order-1 flex space-x-4 sm:order-2">
                    <a
                        href="/privacy"
                        className="transition-colors hover:text-indigo-600 dark:hover:text-indigo-400"
                    >
                        Privacy Policy
                    </a>
                    <a
                        href="/terms"
                        className="transition-colors hover:text-indigo-600 dark:hover:text-indigo-400"
                    >
                        Terms of Service
                    </a>
                </div>
            </div>
        </footer>
    );
};
