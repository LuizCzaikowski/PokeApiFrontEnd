// types/index.ts
export interface Pokemon {
    name: string;
    url: string;
    id: string;
    abilities: string[];
}

export interface PokemonAPIResponse {
    count: number;
    next: string | null;
    previous: string | null;
    results: Array<{ name: string; url: string }>;
}

export interface PokemonDetails {
    id: number;
    name: string;
    types: Array<{ type: { name: string } }>;
    abilities: Array<{ ability: { name: string } }>;
}

export interface AbilityIcons {
    [key: string]: string;
}

export const abilityIconsMap: Record<string, string> = {
    'blaze': require('@/assets/img/powers/fire.png'),
    'solar-power': require('@/assets/img/powers/fire.png'),
    'overgrow': require('@/assets/img/powers/grass.png'),
    'chlorophyll': require('@/assets/img/powers/grass.png'),
    'torrent': require('@/assets/img/powers/water.png'),
    'rain-dish': require('@/assets/img/powers/water.png'),
    'shield-dust': require('@/assets/img/powers/ground.png'),
    'run-away': require('@/assets/img/powers/normal.png'),
    'compound-eyes': require('@/assets/img/powers/ground.png'),
    'keen-eye': require('@/assets/img/powers/normal.png'),
    'tangled-feet': require('@/assets/img/powers/normal.png'),
    'big-pecks': require('@/assets/img/powers/flying.png'),
    'swarm': require('@/assets/img/powers/ground.png'),
    'sniper': require('@/assets/img/powers/normal.png'),
    'guts': require('@/assets/img/powers/normal.png'),
    'hustle': require('@/assets/img/powers/normal.png'),
    'shed-skin': require('@/assets/img/powers/flying.png'),
    'tinted-lens': require('@/assets/img/powers/flying.png'),
  };  

