// import React from 'react';

// import { usePokemonCollection } from '../collection.context';

// export const ProgressBar: React.FC = React.memo(() => {
//     const { getCaughtCount, totalPokemonCount, activeCollectionType } =
//         usePokemonCollection();

//     const caughtPokemonCount = getCaughtCount(activeCollectionType);

//     const progress =
//         totalPokemonCount > 0
//             ? Math.round((caughtPokemonCount / totalPokemonCount) * 100)
//             : 0;

//     return (
//         <div
//             className="group fixed bottom-4 left-1/2 z-50 flex h-8 w-64 max-w-full -translate-x-1/2 items-center justify-center overflow-hidden rounded-full bg-gray-200 shadow-lg dark:bg-gray-700"
//             role="progressbar"
//             aria-valuenow={caughtPokemonCount}
//             aria-valuemin={0}
//             aria-valuemax={totalPokemonCount}
//             aria-label="Pokémon Collection Progress"
//         >
//             {/* Progress bar fill */}
//             <div
//                 className="absolute top-0 left-0 h-full rounded-full bg-indigo-500 transition-all duration-500 ease-out"
//                 style={{ width: `${progress}%` }}
//             ></div>

//             {/* Text overlay */}
//             <div className="relative text-sm font-semibold text-white drop-shadow">
//                 {progress}% ({caughtPokemonCount}/{totalPokemonCount})
//             </div>
//         </div>
//     );
// });
