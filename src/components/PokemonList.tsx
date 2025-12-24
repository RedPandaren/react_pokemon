import { getPokemonList, getPokemonByType } from "../gateway/pokemonFetcher";
import { useEffect, useState, useMemo, startTransition } from "react";
import { Button } from "@/components/ui/button";

import { createPaginator } from "@/utils/Pagination";
import { pokemonMatchCase, insertSpriteUrl } from "@/utils/PokemonUtils";
import { useSelector, useDispatch } from "react-redux";
import { setSelectedPokemon } from "../store/pokemonSlice";

import PokemonCard from "./pokemon/PokemonCard";
import SelectedPokemonCard from "./pokemon/PokemonSelectCard";
import OverlayLoading from "./OverlayLoading";

import type { RootState } from "../reduxStore";
import type {
  PokemonListItem,
  PokemonByTypeResponse,
  PokemonNoFilterResponse,
} from "./types/Interfaces";

import POKEMON from "../components/config/pokemon.config";
import { useFetchQuery } from "@/gateway/QueryUtils";

const { PAGE_SIZE } = POKEMON;

export default function PokemonList() {
  const { GetPokemonList, GetPokemonListByType } = useFetchQuery();

  const dispatch = useDispatch();

  const selectedType = useSelector(
    (state: RootState) => state.pokemon.selectedType
  );

  const textSearch = useSelector(
    (state: RootState) => state.pokemon.textSearch
  );

  const selectedPokemon = useSelector(
    (state: RootState) => state.pokemon.selectedPokemon
  );

  const handlSelectedPokemonChange = (value: string) => {
    dispatch(setSelectedPokemon({ name: value }));
  };

  const [offset, setOffset] = useState(0);
  const [pokemonList, setPokemonList] = useState<PokemonListItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [debouncedText, setDebouncedText] = useState(textSearch); // debounce test

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedText(textSearch);
      setOffset(0);
    }, 300);

    return () => clearTimeout(timeout);
  }, [textSearch]);

  const {
    data: pokemonData,
    isLoading,
    isError,
  } = selectedType
    ? GetPokemonListByType(selectedType),
    : GetPokemonList(PAGE_SIZE, offset);

  useEffect(() => {
    if (isLoading) return;
    if (pokemonData) {
      startTransition(() => {
        const list = selectedType
          ? pokemonData.pokemon.map((p) => p.pokemon)
          : pokemonData.results;

        setPokemonList(insertSpriteUrl(list));
        setLoading(false);
      });
    }

    if (isError) {
      setError("Failed to load Pokémon list");
    }
  }, [pokemonData, selectedType, offset, isError, isLoading]);

  if (isLoading) {
    return <OverlayLoading isLoading={true} />;
  }

  const filteredPokemon =
    textSearch && textSearch.trim() !== ""
      ? pokemonMatchCase(pokemonList, debouncedText)
      : pokemonList;

  const pagedPokemon = (
    filteredPokemon as (PokemonListItem & {
      sprite_url: string;
    })[]
  ).slice(offset, offset + PAGE_SIZE);

  const paginator = createPaginator(offset, PAGE_SIZE, filteredPokemon.length);

  if (error) return <p>{error}</p>;

  return (
    <>
      <div className="justify-center flex flex-col gap-4 h-215">
        {loading && <OverlayLoading isLoading />}

        <div className="grid grid-cols-5 gap-4 h-auto ml-3 mr-3">
          {pagedPokemon.map((p, index) => (
            <PokemonCard
              key={index}
              name={p.name}
              url={p.sprite_url}
              onSelect={handlSelectedPokemonChange}
            />
          ))}
        </div>

        {selectedPokemon && <SelectedPokemonCard />}
      </div>

      <div className="flex justify-center">
        {pagedPokemon.length !== 0 && (
          <div className="flex justify-center items-center gap-4">
            <Button
              className="w-25"
              disabled={!paginator.hasPrevious || isLoading}
              onClick={() => setOffset(paginator.previousOffset)}
            >
              Previous
            </Button>

            <Button
              className="w-25"
              disabled={!paginator.hasNext || isLoading}
              onClick={() => setOffset(paginator.nextOffset)}
            >
              Next
            </Button>
          </div>
        )}
      </div>
    </>
  );
}
