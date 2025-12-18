import {
  getPokemonTypes,
  getPokemonList,
  getPokemonByNameOrId,
  getPokemonByType,
} from "../gateway/pokemonFetcher";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

import { createPaginator } from "@/utils/Pagination";
import { pokemonMatchCase, insertSpriteUrl } from "@/utils/PokemonUtils";

import TypeSelect from "./PokemonSelectType";
import PokemonCard from "./PokemonList";
import PokemonTextSearch from "./PokemonTextSearch";
import SelectedPokemonCard from "./PokemonSelectCard";
import OverlayLoading from "./OverlayLoading";

import type { PokemonListItem } from "../gateway/pokemonFetcher";

interface GetPokemonTypesProps {
  selectedType: string;
  textSearch: string;
  onTypeChange: (type: string) => void;
  onTextSearchChange: (type: string) => void;
}

interface GetPokemonListProps {
  selectedType: string;
  textSearch: string;
}

interface PokemonByTypeResponse {
  pokemon: { pokemon: PokemonListItem }[];
}

interface PokemonListResponse {
  results: PokemonListItem[];
}

export function GetPokemonTypes({
  selectedType,
  textSearch,
  onTypeChange,
  onTextSearchChange,
}: GetPokemonTypesProps) {
  const [pokemonTypes, setPokemonTypes] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

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
  console.log(textSearch);
  return (
    <>
      <OverlayLoading isLoading={loading} />
      <div className="flex justify-start gap-4 pt-4">
        <PokemonTextSearch
          value={textSearch}
          placeholder="Search Pokemon"
          onChange={onTextSearchChange}
        />

        <div className="flex justify-end gap-4 ">
          <div className="flex w-full max-w-xs justify-end ">
            <TypeSelect
              types={pokemonTypes}
              value={selectedType}
              onChange={onTypeChange}
            />
          </div>

          <Button
            onClick={() => {
              onTypeChange("");
              onTextSearchChange("");
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

export function GetPokemonList({
  selectedType,
  textSearch,
}: GetPokemonListProps) {
  const PAGE_SIZE = 20;

  const [offset, setOffset] = useState(0);
  const [pokemonList, setPokemonList] = useState<PokemonListItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedPokemon, setSelectedPokemon] = useState<string | null>(null);

  // Fetch Pokémon list or by type
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
      ? pokemonMatchCase(pokemonList, textSearch)
      : pokemonList;

  const pagedPokemon = filteredPokemon.slice(offset, offset + PAGE_SIZE);
  const paginator = createPaginator(offset, PAGE_SIZE, filteredPokemon.length);

  if (error) return <p>{error}</p>;

  return (
    <div className="justify-center flex flex-col gap-4 w-420 h-235">
      {loading && <OverlayLoading isLoading />}

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {pagedPokemon.map((p) => (
          <PokemonCard
            key={p.name}
            name={p.name}
            url={p.sprite_url}
            onSelect={setSelectedPokemon}
          />
        ))}
      </div>

      {selectedPokemon && (
        <SelectedPokemonCard
          name={selectedPokemon}
          onClose={() => setSelectedPokemon(null)}
        />
      )}
      {pagedPokemon.length != 0 && (
        <div className="w-420 flex justify-center items-center gap-4">
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
  );
}
