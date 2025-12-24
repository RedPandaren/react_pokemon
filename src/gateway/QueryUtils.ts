import { useQuery } from "@tanstack/react-query";
import POKEMON from "../components/config/pokemon.config";

const { POKEMON_URL } = POKEMON;

export const useFetchQuery = () => {
  const GetPokemonTypes = () => {
    const url = `${POKEMON_URL}/type`;
    return useQuery({
      queryKey: ["pokemonTypes"], // More descriptive query key
      queryFn: () => fetch(url).then((res) => res.json()),
    });
  };

  const GetPokemonByName = (name: string) => {
    const url = `${POKEMON_URL}/pokemon/${name}`;
    return useQuery({
      queryKey: ["pokemonDetails", name],
      queryFn: () => fetch(url).then((res) => res.json()),
    });
  };

  const GetPokemonList = (limit: number, offset: number) => {
    const url = `${POKEMON_URL}/pokemon?limit=${limit}&offset=${offset}`;
    return useQuery({
      queryKey: ["pokemonList", limit, offset],
      queryFn: () => fetch(url).then((res) => res.json()),
    });
  };

  const GetPokemonListByType = (type: string) => {
    const url = `${POKEMON_URL}/type/${type}`;
    return useQuery({
      queryKey: ["pokemonList", type],
      queryFn: () => fetch(url).then((res) => res.json()),
    });
  };

  return {
    GetPokemonTypes,
    GetPokemonByName,
    GetPokemonList,
    GetPokemonListByType,
  };
};
