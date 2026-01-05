import { useState, useEffect } from 'react';

export const useDarkMode = () => {
    // Check localStorage or system preference for initial state
    const isBrowserDefaultDark = () =>
        window.matchMedia('(prefers-color-scheme: dark)').matches;

    const [isDarkMode, setIsDarkMode] = useState(() => {
        // Check localStorage first
        const theme = localStorage.getItem('theme');
        if (theme) {
            return theme === 'dark';
        }
        // Fallback to system preference
        return isBrowserDefaultDark();
    });

    function toggleDarkMode() {
        setIsDarkMode((prevMode) => !prevMode);
    }

    // Effect to update the DOM and localStorage whenever isDarkMode changes
    useEffect(() => {
        const root = window.document.documentElement;

        // Remove both 'light' and 'dark' to ensure only the current one is applied
        root.classList.remove(isDarkMode ? 'light' : 'dark');
        root.classList.add(isDarkMode ? 'dark' : 'light');

        // Persist the theme choice
        localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
    }, [isDarkMode]);

    return { isDarkMode, toggleDarkMode };
};
