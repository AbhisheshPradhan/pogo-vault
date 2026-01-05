/**
 * Defines the structure for names localized by language code.
 */
export interface LocalizedNames {
	eng: string;
	deu?: string;
	fra?: string;
	jap?: string;
	kor?: string;
	cht?: string;
	chs?: string;
	esp?: string;
	ita?: string;
}

/**
 * Defines the structure for a Pokémon's abilities.
 */
export interface Abilities {
	primary: string;
	secondary: string | null;
	hidden: string | null;
}

/**
 * Defines the structure for a Pokémon's base stats.
 */
export interface BaseStats {
	hp: number;
	atk: number;
	def: number;
	spa: number;
	spd: number;
	spe: number;
}

/**
 * Defines the structure for external references (Smogon, Showdown, Serebii, etc.).
 */
export interface Refs {
	pkApiId: string;
	pkApiFormId: string;
	pkApiFormSlug: string;
	smogon: string;
	showdown: string;
	showdownName: string;
	serebii: string;
	bulbapedia: string;
}

// 1. Base Interface: Contains all common properties
export interface BasePokemonAttributes {
	id: string;

	nid: string;
	dexNum: number;
	formId: string | null;
	region: string;
	gen: number;
	type1: string;
	type2: string | null;
	color: string;

	isDefault: boolean;
	isForm: boolean;
	isLegendary: boolean;
	isMythical: boolean;
	isUltraBeast: boolean;
	ultraBeastCode: string | null;
	isSpecialAbilityForm: boolean;
	isCosmeticForm: boolean;
	isFemaleForm: boolean;
	hasGenderDifferences: boolean;
	isBattleOnlyForm: boolean;
	isSwitchableForm: boolean;
	isFusion: boolean;
	fusedWith: string | null;
	isMega: boolean;
	isPrimal: boolean;
	isGmax: boolean;
	isRegional: boolean;

	debutIn: string;

	shinyReleased: boolean;
	shadowReleased: boolean;
	baseSpecies: string | null;
	evolvesFrom: {
		pokemon: string | null;
		level?: number;
		item?: string;
		type?: string;
	} | null;
}

// 2. Pokemon Interface: Extends the base and adds the flattened names
// Use this type to reference Pokemon object in the App
export interface Pokemon extends BasePokemonAttributes {
	// Flattened names
	speciesId: string;
	name: string;
	speciesName: string;
	formName: string;

	// new properties

	eventExclusive: boolean;
	isShiny: boolean;
	isShadow: boolean;

	availableInPogo: boolean;
}

// 3. DetailedPokemon Interface: Extends the base and adds all nested/detailed properties

// Assume these helper interfaces are defined elsewhere (as in your previous examples)
// interface Abilities { ... }
// interface BaseStats { ... }
// interface Refs { ... }
// interface LocalizedNames { ... }

export interface DetailedPokemon extends BasePokemonAttributes {
	teraType: string | null;
	abilities: Abilities;

	canGmax: boolean;
	canDynamax: boolean;
	canBeAlpha: boolean;

	obtainableIn: string[];
	versionExclusiveIn: string[];
	eventOnlyIn: string[];
	storableIn: string[];
	registrableIn: string[];

	shinyBase: string | null;
	baseStats: BaseStats;
	weight: number;
	height: number;
	maleRate: number;
	femaleRate: number;
	baseForms: string[];
	forms: any[]; // Assuming forms is an array of other pokemon IDs/objects

	refs: Refs;
	names: LocalizedNames;
	speciesNames: LocalizedNames;
	formNames: LocalizedNames;
	genus: LocalizedNames;
}
