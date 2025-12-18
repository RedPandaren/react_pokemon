import { httpClient } from "./httpClient";
import { POKEMON_ENDPOINTS } from "./endpoints";

/* ===== Types (minimal, extend as needed) ===== */

export interface PokemonListItem {
  name: string;
  url: string;
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

// Get Pokemon list
export function getPokemonList(limit = 20, offset = 0) {
  return httpClient<unknown>(POKEMON_ENDPOINTS.list(limit, offset));
}

// Get Pokemon by name or ID
export function getPokemonByNameOrId(nameOrId: string | number) {
  return httpClient(POKEMON_ENDPOINTS.detail(nameOrId));
}

// Get all Pokemon types
export function getPokemonTypes() {
  return httpClient<{ results: PokemonType[] }>(POKEMON_ENDPOINTS.types.list);
}

// Get Pokemon by type
export function getPokemonByType(type: string) {
  return httpClient<PokemonTypeResponse>(POKEMON_ENDPOINTS.types.detail(type));
}
