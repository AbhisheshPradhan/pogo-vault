export const generateSlug = (name: string): string => {
    return name
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, '') // Remove special characters
        .replace(/\s+/g, '-') // Replace spaces with hyphens
        .replace(/--+/g, '-') // Replace multiple hyphens with single hyphen
        .replace(/^-+|-+$/g, ''); // Remove leading/trailing hyphens
};

// Examples:
// "Kanto Dex" → "kanto-dex"
// "Shiny Living Dex!" → "shiny-living-dex"
// "Gen 1 Pokédex" → "gen-1-pokedex"
