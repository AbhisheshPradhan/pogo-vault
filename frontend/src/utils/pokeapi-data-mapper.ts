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
        availableInPogo: isavailableInPogo || false,
        baseSpecies: data.baseSpecies || null,
        color: data.color || '',
        debutIn: data.debutIn || '',
        dexNum: data.dexNum || 0,
        evolvesFrom: data.evolvesFrom || null,
        eventExclusive:
            (data.eventOnlyIn && data.eventOnlyIn.length > 0) || false,
        formId: data.formId || null,
        formName: formNameEng || '',
        fusedWith: data.fusedWith || null,
        gen: data.gen || 0,
        hasGenderDifferences: data.hasGenderDifferences || false,
        id: generateNewId(data.id, isShiny, isShadow),
        isBattleOnlyForm: data.isBattleOnlyForm || false,
        isCosmeticForm: data.isCosmeticForm || false,
        isDefault: isDefaultValue || false,
        isFemaleForm: data.isFemaleForm || false,
        isForm: data.isForm || false,
        isFusion: data.isFusion || false,
        isGmax: data.isGmax || false,
        isLegendary: data.isLegendary || false,
        isMega: data.isMega || false,
        isMythical: data.isMythical || false,
        isPrimal: data.isPrimal || false,
        isRegional: data.isRegional || false,
        isShadow: isShadow || false,
        isSpecialAbilityForm: data.isSpecialAbilityForm || false,
        isSwitchableForm: data.isSwitchableForm || false,
        isUltraBeast: data.isUltraBeast || false,
        isShiny: isShiny || false,
        name: nameEng || '',
        nid: data.nid || '',
        region: data.region || '',
        shadowReleased: isShadowReleased(data.dexNum) || false,
        shinyReleased: data.shinyReleased || false,
        speciesId: data.id || '',
        speciesName: speciesNameEng || '',
        type1: data.type1 || '',
        type2: data.type2 || null,
        ultraBeastCode: data.ultraBeastCode || null,
    };
}

const unreleasedShadowIds = [
    21, 22, 25, 26, 35, 36, 39, 40, 46, 47, 77, 78, 83, 84, 85, 86, 87, 98, 99,
    108, 113, 115, 118, 119, 128, 132, 133, 134, 135, 136, 140, 141, 151,
];

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
