/**
 * Query Key Factory for Collection-related data.
 * Follows the pattern: [domain, type, params]
 */
export const collectionKeys = {
    all: ['collections'] as const,
    lists: () => [...collectionKeys.all, 'list'] as const,
    list: (filters: object) =>
        [...collectionKeys.lists(), { ...filters }] as const,
    details: () => [...collectionKeys.all, 'detail'] as const,
    detail: (slug: string) => [...collectionKeys.details(), slug] as const,
    pokemons: (slug: string) =>
        [...collectionKeys.detail(slug), 'pokemons'] as const,

    adminAll: () => [...collectionKeys.all, 'admin'] as const,
    adminLists: () => [...collectionKeys.adminAll(), 'list'] as const,
    adminList: (params?: object) =>
        [...collectionKeys.adminLists(), { ...params }] as const,
};

export const userKeys = {
    all: ['user'] as const,
    user: (userId: string) => [...userKeys.all, userId] as const,
    catchStates: (userId: string) =>
        [...userKeys.user(userId), 'catch-states'] as const,
};

export const pokemonKeys = {
    all: ['pokemons'] as const,

    adminAll: () => [...pokemonKeys.all, 'admin'] as const,
};
