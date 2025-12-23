import { httpClient } from "./httpClient";
import { POKEMON_ENDPOINTS } from "./endpoints";
import type {
  PokemonListItem,
  PokemonType,
  PokemonTypeResponse,
} from "@/components/types/Interfaces";

// Get Pokemon list
export function getPokemonList(limit = 20, offset = 0) {
  return httpClient<PokemonListItem>(POKEMON_ENDPOINTS.list(limit, offset));
}

// Get Pokemon by name or ID
export function getPokemonByNameOrId(nameOrId: string) {
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
