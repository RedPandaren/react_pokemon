import {
  getPokemonTypes,
  getPokemonList,
  getPokemonByNameOrId,
  getPokemonByType,
} from "../gateway/pokemonFetcher";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

import { createPaginator } from "@/utils/Pagination";

import TypeSelect from "./PokemonSelectType";
import PokemonCard from "./PokemonList";
import PokemonTextSearch from "./PokemonTextSearch";
import SelectedPokemonCard from "./PokemonSelectCard";
import OverlayLoading from "./OverlayLoading";

import type { PokemonListItem } from "../gateway/pokemonFetcher";

interface GetPokemonTypesProps {
  selectedType: string;
  onTypeChange: (type: string) => void;
}

interface GetPokemonListProps {
  selectedType: string;
}

export function GetPokemonTypes({
  selectedType,
  onTypeChange,
}: GetPokemonTypesProps) {
  const [pokemonTypes, setPokemonTypes] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [textSearch, setTextSearch] = useState<string>("");

  useEffect(() => {
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
      <div className="flex justify-start gap-4 pt-4">
        <PokemonTextSearch
          value={textSearch}
          placeholder="Search Pokemon"
          onChange={setTextSearch}
        />

        <div className="flex justify-end gap-4 ">
          <div className="flex w-full max-w-xs justify-end ">
            <TypeSelect
              types={pokemonTypes}
              value={selectedType}
              onChange={onTypeChange}
            />
          </div>
        </div>
        {/* <p>Selected Type: {selectedType}</p> */}
      </div>
    </>
  );
}

export function GetPokemonList({ selectedType }: GetPokemonListProps) {
  const PAGE_SIZE = 20;

  const [offset, setOffset] = useState(0);
  const [pokemonList, setPokemonList] = useState<PokemonListItem[]>([]);
  const pagedPokemon = pokemonList.slice(offset, offset + PAGE_SIZE);
  const paginator = createPaginator(offset, PAGE_SIZE, pokemonList.length);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedPokemon, setSelectedPokemon] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);

    const request = selectedType
      ? getPokemonByType(selectedType)
      : getPokemonList(20, offset);

    request
      .then((response) => {
        if (selectedType) {
          setPokemonList(response.pokemon.map((p: any) => p.pokemon));
        } else {
          setPokemonList(response.results);
        }
      })
      .catch(() => setError("Failed to load Pokémon list"))
      .finally(() => setLoading(false));
  }, [selectedType, offset]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="justify-center flex flex-col gap-4 w-420 h-235">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {pagedPokemon.map((p) => (
          <PokemonCard
            key={p.name}
            name={p.name}
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

      <>
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
      </>
    </div>
  );
}
