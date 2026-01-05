import type { DetailedPokemon, Pokemon } from '@shared/types';

// Helper function to create a single SimplifiedPokemon object
function createSimplifiedEntry(
    data: DetailedPokemon,
    isShiny: boolean,
    isShadow: boolean,
    isavailableInPogo: boolean,
): Pokemon {
    // Safely extract the English names
    const nameEng = data.names?.eng || '';
    const speciesNameEng = data.speciesNames?.eng || '';
    const formNameEng = data.formNames?.eng || '';

    // --- 🌟 LOGIC UPDATE HERE 🌟 ---
    // A simplified entry is NOT considered the "default" if it is Shiny OR Shadow.
    const isDefaultValue = isShiny || isShadow ? false : data.isDefault;

    return {
        id: generateNewId(data.id, isShiny, isShadow),
        speciesId: data.id,
        nid: data.nid,
        // Flattened names
        name: nameEng,
        speciesName: speciesNameEng,
        formName: formNameEng,
        // Direct copies of top-level properties
        dexNum: data.dexNum,
        formId: data.formId,
        region: data.region,
        gen: data.gen,
        type1: data.type1,
        type2: data.type2,
        color: data.color,
        isDefault: isDefaultValue, // non-shiny & non-shadow = base form
        isForm: data.isForm,
        isLegendary: data.isLegendary,
        isMythical: data.isMythical,
        isUltraBeast: data.isUltraBeast,
        ultraBeastCode: data.ultraBeastCode,
        isSpecialAbilityForm: data.isSpecialAbilityForm,
        isCosmeticForm: data.isCosmeticForm,
        isFemaleForm: data.isFemaleForm,
        hasGenderDifferences: data.hasGenderDifferences,
        isBattleOnlyForm: data.isBattleOnlyForm,
        isSwitchableForm: data.isSwitchableForm,
        isFusion: data.isFusion,
        fusedWith: data.fusedWith,
        isMega: data.isMega,
        isPrimal: data.isPrimal,
        isGmax: data.isGmax,
        isRegional: data.isRegional,
        eventExclusive: data.eventOnlyIn && data.eventOnlyIn.length > 0,
        debutIn: data.debutIn,
        shinyReleased: data.shinyReleased,
        shadowReleased: isShadowReleased(data.dexNum),
        baseSpecies: data.baseSpecies,
        evolvesFrom: data.evolvesFrom,
        // New flags
        isShiny: isShiny,
        isShadow: isShadow, // New property
        availableInPogo: isavailableInPogo,
    };
}

const unreleasedShadowIds = [
    21, 22, 25, 26, 35, 36, 39, 40, 46, 47, 77, 78, 83, 84, 85, 86, 87, 98, 99,
    108, 113, 115, 118, 119, 128, 132, 133, 134, 135, 136, 140, 141, 151,
];

// const unreleasedShadowShinyIds = [
//     10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 27, 28, 37, 38, 43, 44, 45, 50,
//     51, 54, 55, 56, 57, 63, 64, 65, 79, 80, 90, 91, 92, 93, 94, 95, 100, 101,
//     106, 107, 111, 112, 114, 120, 121, 125, 126, 129, 130, 137, 143,
// ];

const isShadowReleased = (dexNum: number) =>
    !unreleasedShadowIds.includes(dexNum);

const generateNewId = (
    id: string,
    isShiny: boolean,
    isShadow: boolean,
): string => {
    if (isShadow) {
        id += '-shadow';
    }
    if (isShiny) {
        id += '-shiny';
    }

    return id;
};
/**
 * Converts an array of detailed Pokémon data into a simplified, filtered array,
 * creating up to four entries per Pokémon (Regular, Shiny, Shadow, Shiny Shadow).
 *
 * @param {DetailedPokemon[]} detailedPokemonArray - The array of original detailed Pokémon objects.
 * @returns {SimplifiedPokemon[]} A new array of simplified Pokémon objects.
 */
export function simplifyAndFilterPokemonData(
    detailedPokemonArray: DetailedPokemon[],
): Pokemon[] {
    if (!detailedPokemonArray || detailedPokemonArray.length === 0) {
        return [];
    }

    return detailedPokemonArray.flatMap((data) => {
        // const isRegistrableInGo =
        //     data.obtainableIn && data.obtainableIn.includes('go');

        // // Only proceed if registrable in GO
        // if (!isRegistrableInGo) {
        //     return [];
        // }

        const entries: Pokemon[] = [];

        entries.push(createSimplifiedEntry(data, false, false, true));

        // shinyReleased in main series games
        if (data.shinyReleased) {
            entries.push(createSimplifiedEntry(data, true, false, true));
        }

        const canBeShadow = !(data.isMega || data.isPrimal || data.isGmax);
        const isShadowAvailable = isShadowReleased(data.dexNum);
        if (canBeShadow) {
            entries.push(
                createSimplifiedEntry(data, false, true, isShadowAvailable),
            );
        }

        if (data.shinyReleased && canBeShadow) {
            entries.push(
                createSimplifiedEntry(data, true, true, isShadowAvailable),
            );
        }

        return entries;
    });
}
