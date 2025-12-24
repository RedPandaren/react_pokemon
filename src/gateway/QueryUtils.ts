import { useQuery } from "@tanstack/react-query";
import POKEMON from "../components/config/pokemon.config";

const { POKEMON_URL } = POKEMON;

export const useFetchQuery = () => {
  const cacheDetails = (seconds: number) => {
    return {
      staleTime: seconds * 1000,
      cacheTime: seconds * 1500,
      refetchOnWindowFocus: true,
      refetchOnReconnect: true,
    };
  };
  const GetPokemonTypes = () => {
    const url = `${POKEMON_URL}/type`;
    return useQuery({
      queryKey: ["pokemonTypes"], // More descriptive query key
      queryFn: () => fetch(url).then((res) => res.json()),
      ...cacheDetails(3600),
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
      ...cacheDetails(3600),
    });
  };

  const GetPokemonListByType = (type: string) => {
    const url = `${POKEMON_URL}/type/${type}`;
    return useQuery({
      queryKey: ["pokemonList", type],
      queryFn: () => fetch(url).then((res) => res.json()),
      ...cacheDetails(3600),
    });
  };

  return {
    GetPokemonTypes,
    GetPokemonByName,
    GetPokemonList,
    GetPokemonListByType,
    cacheDetails,
  };
};
