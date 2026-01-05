import React, { memo } from 'react';
import ShadowBG from '@assets/shadow/shadow.svg';
import type { Pokemon } from '@shared/types';
import PokeballSVG from '@assets/pokeball.svg';

interface PokemonCardProps {
    pokemon: Pokemon;
    isCaught: boolean;
    onToggleCatchState: (pokemonId: string) => void;
}

export const PokemonCard: React.FC<PokemonCardProps> = memo(
    ({ pokemon, isCaught, onToggleCatchState }) => {
        const cardClasses = `
        cursor-pointer rounded-lg bg-white shadow-xl ring ring-gray-900/5 
        transition-transform duration-200 hover:scale-[1.03] dark:bg-gray-800
        ${isCaught ? 'ring-2 ring-green-400' : ''}
    `;

        const spriteUrl = `https://static-img.pokepc.net/images/pokemon/home3d-icon/${pokemon.isShiny ? 'shiny' : 'regular'}/${pokemon.nid}.webp`;

        // const isInRaid = pokemon.id === 150;
        // const isInSpecialResearch = pokemon.id === 151;

        // const cardClasses = `
        //     cursor-pointer rounded-lg bg-white shadow-xl ring ring-gray-900/5
        //     transition-transform duration-200 hover:scale-[1.03] dark:bg-gray-800
        //     ${caught ? 'ring-2 ring-green-400' : ''}

        //     ${!caught && isInRaid ? 'ring-4 ring-red-500 animate-pulse-ring-red' : ''}
        //     ${!caught && isInSpecialResearch ? 'ring-4 ring-yellow-500 ' : ''}
        // `;

        return (
            <>
                <div
                    className={cardClasses}
                    onClick={() => onToggleCatchState(pokemon.id)}
                >
                    <div className="relative flex aspect-square w-full items-center justify-center px-4 py-4">
                        {/* Poké Ball Marker */}
                        {isCaught && (
                            <img
                                className="absolute top-2 right-2 z-10 flex h-6 w-6 items-center justify-center rounded-full border border-gray-300 bg-white shadow-md md:h-6 md:w-6 dark:border-gray-600 dark:bg-gray-700"
                                src={PokeballSVG}
                                alt={`pokeball`}
                            />
                        )}

                        {pokemon.isShadow && (
                            <img
                                className="animate-flame absolute inset-0 z-0 h-full w-full p-4 opacity-80"
                                src={ShadowBG}
                                alt={`shadow`}
                            />
                        )}

                        {pokemon.isShiny && (
                            <div className="shiny-mask subtle-sparkle-filter absolute top-3 left-2 z-0 h-10 w-7 bg-gray-700 md:h-15 md:w-10 dark:bg-yellow-200" />
                        )}

                        <img
                            src={spriteUrl}
                            alt={`${pokemon.name} - sprite`}
                            className={`z-10 h-full object-contain ${
                                pokemon.isShadow
                                    ? 'greyscale drop-shadow-magenta-500/50a brightness-80 contrast-90 drop-shadow-lg filter'
                                    : 'max-h-100 w-full max-w-100'
                            }`}
                        />

                        {/* <AvailabilityTag label={'RAID!'} /> */}
                    </div>

                    <div className="mb-2 text-center text-xs sm:text-sm md:text-lg">
                        {pokemon.name}
                    </div>
                    {/* <span className="text-sm font-semibold text-gray-500 dark:text-gray-400">
                    {'#' + pokemon.dexNum}
                </span> */}
                </div>
            </>
        );
    },
);
