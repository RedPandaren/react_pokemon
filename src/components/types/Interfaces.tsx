// COMPONENT TYPES
export interface PokemonByTypeResponse {
  pokemon: { pokemon: PokemonListItem }[];
}

export interface PokemonNoFilterResponse {
  results: PokemonListItem[];
}

// GATEWAY TYPES
export interface PokemonListItem {
  name: string;
  url: string;
  sprite_url?: string;
}

export interface PokemonListResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: PokemonListItem[];
}

export interface PokemonType {
  name: string;
}

export interface PokemonTypeResponse {
  name: string;
  pokemon: {
    pokemon: {
      name: string;
      url: string;
    };
  }[];
}
