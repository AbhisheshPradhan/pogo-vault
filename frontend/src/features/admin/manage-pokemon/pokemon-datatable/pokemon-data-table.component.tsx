import { useState } from 'react';
import { Select } from '@headlessui/react';

import { PokemonDataTableRow } from './pokemon-data-table-row.component';
import { useAdminPokemons } from '../hooks/useAdminPokemons';

export const PokemonDataTable: React.FC = () => {
    const { pokemonList, isLoading } = useAdminPokemons();

    const [searchTerm, setSearchTerm] = useState('');
    const [filterAvailability, setFilterAvailability] = useState('all');
    const [filterVariant, setFilterVariant] = useState('all');

    // Filter logic
    const filteredPokemon = pokemonList.filter((pokemon) => {
        const matchesSearch =
            pokemon.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            pokemon.dexNum?.toString().includes(searchTerm);

        const matchesAvailability =
            filterAvailability === 'all' ||
            (filterAvailability === 'available' && pokemon.availableInPogo) ||
            (filterAvailability === 'unavailable' && !pokemon.availableInPogo);

        const matchesVariant =
            filterVariant === 'all' ||
            (filterVariant === 'regular' &&
                !pokemon.isShiny &&
                !pokemon.isShadow) ||
            (filterVariant === 'shiny' &&
                pokemon.isShiny &&
                !pokemon.isShadow) ||
            (filterVariant === 'shadow' &&
                pokemon.isShadow &&
                !pokemon.isShiny) ||
            (filterVariant === 'shadow-shiny' &&
                pokemon.isShadow &&
                pokemon.isShiny);

        return matchesSearch && matchesAvailability && matchesVariant;
    });

    return (
        <div>
            {/* Search and Filters */}
            <div className="mb-6 space-y-4">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                    {/* Search */}
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Search by name or dex number..."
                            className="w-full cursor-text rounded-lg border border-gray-300 px-4 py-2 pr-10 text-black focus:border-transparent focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        {searchTerm && (
                            <button
                                type="button"
                                onClick={() => setSearchTerm('')}
                                className="absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
                                aria-label="Clear search"
                            >
                                <svg
                                    className="h-5 w-5"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            </button>
                        )}
                    </div>

                    {/* Availability Filter */}
                    <Select
                        name="status"
                        className="w-full cursor-pointer rounded-lg border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
                        aria-label="Availability status"
                        value={filterAvailability}
                        onChange={(e) => setFilterAvailability(e.target.value)}
                    >
                        <option value="all">All Availability</option>
                        <option value="available">Available Only</option>
                        <option value="unavailable">Unavailable Only</option>
                    </Select>

                    {/* Variant Filter */}

                    <Select
                        name="status"
                        className="w-full cursor-pointer rounded-lg border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
                        aria-label="Variant type"
                        value={filterVariant}
                        onChange={(e) => setFilterVariant(e.target.value)}
                    >
                        <option value="all">All Variants</option>
                        <option value="regular">Regular</option>
                        <option value="shiny">Shiny</option>
                        <option value="shadow">Shadow</option>
                        <option value="shadow-shiny">Shadow Shiny</option>
                    </Select>
                </div>

                {/* Results Count */}
                {!isLoading && (
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                        Showing {filteredPokemon.length} of {pokemonList.length}{' '}
                        variants
                    </div>
                )}
            </div>

            {/* Table */}
            <ul role="list" className="divide-y divide-white/5">
                {filteredPokemon.map((pokemon) => {
                    return (
                        <div key={pokemon.id}>
                            {pokemon.isDefault && (
                                <div className="mt-5">
                                    <div className="align-center text-sm font-semibold text-gray-500 dark:text-gray-400">
                                        {'#' + pokemon.dexNum} {pokemon.name}
                                    </div>
                                </div>
                            )}

                            <PokemonDataTableRow pokemon={pokemon} />
                        </div>
                    );
                })}
            </ul>

            {/* No Results */}
            {!isLoading && filteredPokemon.length === 0 && (
                <div className="py-12 text-center">
                    <p className="text-gray-500 dark:text-gray-400">
                        No Pokémon found matching your filters
                    </p>
                </div>
            )}
        </div>
    );
};
