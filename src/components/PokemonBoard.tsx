import {
  getPokemonTypes,
  getPokemonList,
  getPokemonByType,
} from "../gateway/pokemonFetcher";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

import { createPaginator } from "@/utils/Pagination";
import { pokemonMatchCase, insertSpriteUrl } from "@/utils/PokemonUtils";

import TypeSelect from "./PokemonSelectType";
import PokemonCard from "./PokemonCard";
import PokemonTextSearch from "./PokemonTextSearch";
import SelectedPokemonCard from "./PokemonSelectCard";
import OverlayLoading from "./OverlayLoading";

import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../reduxStore";
import {
  setSelectedType,
  setTextSearch,
  setSelectedPokemon,
  clearFilters,
  clearSelectedPokemon,
} from "../store/pokemonSlice";

import type { PokemonListItem } from "../gateway/pokemonFetcher";

interface PokemonByTypeResponse {
  pokemon: { pokemon: PokemonListItem }[];
}

interface PokemonListResponse {
  results: PokemonListItem[];
}

export function GetPokemonTypes() {
  const dispatch = useDispatch();

  const selectedType = useSelector(
    (state: RootState) => state.pokemon.selectedType
  );
  const textSearch = useSelector(
    (state: RootState) => state.pokemon.textSearch
  ); // REPLACED STATE LISTENER FROM USE STATEE TO THIS HEHE (TEST)

  const [pokemonTypes, setPokemonTypes] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleTextSearchChange = (value: string) => {
    dispatch(setTextSearch(value));
  };

  const handleTypeChange = (value: string) => {
    dispatch(setSelectedType(value));
  };

  useEffect(() => {
    setLoading(true);
    getPokemonTypes()
      .then((response) => setPokemonTypes(response.results.map((t) => t.name)))
      .catch((err) => {
        console.error(err);
        setError("Failed to fetch Pokémon types");
      })
      .finally(() => setLoading(false));
  }, []);

  if (error) return <p>{error}</p>;

  return (
    <>
      <OverlayLoading isLoading={loading} />
      <div className="flex gap-4 pt-4  ml-2">
        <PokemonTextSearch
          value={textSearch}
          placeholder="Search Pokemon"
          onChange={handleTextSearchChange}
        />
        <div className="flex">
          <div className="flex w-full max-w-xs justify-end ml-2">
            <TypeSelect
              types={pokemonTypes}
              value={selectedType}
              onChange={handleTypeChange}
            />
          </div>

          <Button
            onClick={() => {
              dispatch(clearFilters());
            }}
            className="w-35 h-9.5 justify-center text-white bg-white border border-gray-300 rounded-md text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Clear Filter
          </Button>
        </div>
      </div>
    </>
  );
}

export function GetPokemonList() {
  const PAGE_SIZE = 20;

  const dispatch = useDispatch();
  const selectedType = useSelector(
    (state: RootState) => state.pokemon.selectedType
  );
  const textSearch = useSelector(
    (state: RootState) => state.pokemon.textSearch
  );

  const handlSelectedPokemonChange = (value: string) => {
    dispatch(setSelectedPokemon(value));
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
    }, 1000);

    return () => clearTimeout(timeout);
  }, [textSearch]);

  useEffect(() => {
    setError(null);
    setLoading(true);

    const request = selectedType
      ? getPokemonByType(selectedType)
      : getPokemonList(1350, offset);

    request
      .then((response: PokemonByTypeResponse | PokemonListResponse) => {
        const list: PokemonListItem[] = selectedType
          ? (response as PokemonByTypeResponse).pokemon.map((p) => p.pokemon)
          : (response as PokemonListResponse).results;

        setPokemonList(insertSpriteUrl(list));
      })
      .catch(() => setError("Failed to load Pokémon list"))
      .finally(() => setLoading(false));
  }, [selectedType, offset]);

  const filteredPokemon =
    textSearch && textSearch.trim() !== ""
      ? pokemonMatchCase(pokemonList, debouncedText)
      : pokemonList;

  const pagedPokemon = filteredPokemon.slice(offset, offset + PAGE_SIZE);
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

        <SelectedPokemonCard />
      </div>

      <div className="flex justify-center">
        {pagedPokemon.length !== 0 && (
          <div className="flex justify-center items-center gap-4">
            <Button
              className="w-25"
              disabled={!paginator.hasPrevious}
              onClick={() => setOffset(paginator.previousOffset)}
            >
              Previous
            </Button>

            <Button
              className="w-25"
              disabled={!paginator.hasNext}
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
