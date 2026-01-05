import ShadowBG from '@assets/shadow/shadow.svg';

import { useAdminPokemons } from '../hooks/useAdminPokemons';
import type { Pokemon } from '@shared/types';
import { ToggleSwitch } from '@features/ui';

interface PokemonDataTableRowProps {
    pokemon: Pokemon;
}

export const PokemonDataTableRow: React.FC<PokemonDataTableRowProps> = ({
    pokemon,
}) => {
    const { isTogglePending, toggleAvailability } = useAdminPokemons();

    const handleClick = async (pokemon: Pokemon) => {
        if (isTogglePending) {
            return;
        }
        toggleAvailability(pokemon.id);
    };

    const imageUrl = `https://static-img.pokepc.net/images/pokemon/home3d-icon/${pokemon.isShiny ? 'shiny' : 'regular'}/${pokemon.nid}.webp`;

    return (
        <li className="flex justify-between gap-x-6 py-5">
            <div className="flex min-w-0 gap-x-4">
                <img
                    alt=""
                    src={imageUrl}
                    className="size-12 flex-none rounded-full bg-gray-800 outline -outline-offset-1 outline-white/10"
                />
                <div className="min-w-0 flex-auto">
                    <div className="flex h-6">
                        <p className="text-sm/6 font-semibold text-gray-900 dark:text-white">
                            {pokemon.name}
                        </p>
                        <div className="ml-4 block flex h-5">
                            {pokemon.isShadow && (
                                <img
                                    className="mr-2 h-full opacity-80"
                                    src={ShadowBG}
                                    alt={`shadow`}
                                />
                            )}
                            {pokemon.isShiny && (
                                <div className="shiny-mask z-0 h-5 w-5 bg-gray-700 dark:bg-yellow-200" />
                            )}
                        </div>
                    </div>

                    <p className="mt-1 truncate text-xs/5 text-gray-800 dark:text-gray-400">
                        {pokemon.id}
                    </p>
                </div>
            </div>
            <div className="flex justify-between gap-x-4">
                {/* <div className="flex shrink-0 flex-col items-end">
                    <div
                        className={`mt-1 flex ${mutation.isPending ? 'cursor-disabled' : 'cursor-pointer'} items-center gap-x-1.5 rounded-full px-2 text-gray-600 hover:bg-black hover:text-white dark:text-gray-400`}
                        onClick={() => handleClick(pokemon)}
                    >
                        {mutation.isPending ? (
                            <>
                                <div
                                    className={`flex-none rounded-full bg-orange-500/30 p-1`}
                                >
                                    <div
                                        className={`size-1.5 rounded-full bg-orange-500`}
                                    />
                                </div>
                                <p className="text-xs/5 text-gray-600 dark:text-gray-400">
                                    Updating...
                                </p>
                            </>
                        ) : (
                            <>
                                <div
                                    className={`flex-none rounded-full ${pokemon.availableInPogo ? 'bg-emerald-500/30' : 'bg-red-500/30'} p-1`}
                                >
                                    <div
                                        className={`size-1.5 rounded-full ${pokemon.availableInPogo ? 'bg-emerald-500' : 'bg-red-500'}`}
                                    />
                                </div>
                                <p className="text-xs/5">
                                    {pokemon.availableInPogo
                                        ? 'Available'
                                        : 'Not Available'}
                                </p>
                            </>
                        )}
                    </div>
                </div> */}

                <div className="flex items-center gap-3">
                    <ToggleSwitch
                        enabled={pokemon.availableInPogo}
                        onChange={() => handleClick(pokemon)}
                        disabled={isTogglePending}
                    />
                    {/* <span className={`text-xs`}>
                        {mutation.isPending
                            ? 'Updating...'
                            : pokemon.availableInPogo
                              ? 'Available'
                              : 'Not Available'}
                    </span> */}
                </div>
            </div>
        </li>
    );
};
