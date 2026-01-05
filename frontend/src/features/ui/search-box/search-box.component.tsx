import React from 'react';

interface SearchBoxProps {
    searchTerm: string;
    setSearchTerm: any;
}

export const SearchBox: React.FC<SearchBoxProps> = ({
    searchTerm,
    setSearchTerm,
}) => {
    return (
        <input
            type="text"
            placeholder="Search Pokémon by name or ID"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="text-md w-full rounded-xl border-2 border-indigo-500 p-4 text-black placeholder-gray-400 shadow-lg transition duration-150 placeholder:italic placeholder:opacity-75 focus:ring-4 focus:ring-indigo-500/50 focus:outline-none dark:bg-gray-700 dark:text-white"
        />
    );
};
