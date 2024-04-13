export type AbilityIcons = Record<string, string>;

export function getPokemonImage(url: string): string {
    const pokemonId = getPokemonId(url);
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonId}.png`;
}

export function getPokemonId(url: string): string {
    return url.split('/').filter(Boolean).pop() || '';
}