import type { Pokemon } from '@shared/types';

interface AvailabilityInfoModalProps {
    pokemon: Pokemon;
    isOpen: boolean;
    onClose: () => void;
}

export const AvailabilityInfoModal: React.FC<AvailabilityInfoModalProps> = ({
    pokemon,
    isOpen,
    onClose,
}) => {
    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
            onClick={onClose}
        >
            <div
                className="w-11/12 max-w-lg rounded-lg bg-white p-6 shadow-2xl dark:bg-gray-700"
                onClick={(e) => e.stopPropagation()}
            >
                <h2 className="mb-4 text-2xl font-bold capitalize dark:text-white">
                    {pokemon.name} Details
                </h2>
                <p className="dark:text-gray-300">
                    This Pokémon is currently available through:
                    <ul className="mt-2 ml-4 list-inside list-disc">
                        <li>In the Wild (weather dependent)</li>
                        <li>3-Star Raids</li>
                        <li>
                            Completing Special Research: "A Legendary Discovery"
                        </li>
                    </ul>
                </p>

                <div className="text-right">
                    <button
                        onClick={onClose}
                        className="align-center mt-6 cursor-pointer rounded-md bg-indigo-500 px-4 py-2 text-white transition-colors hover:bg-indigo-600"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};
