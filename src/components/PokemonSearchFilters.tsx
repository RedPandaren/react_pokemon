import { getPokemonTypes } from "../gateway/pokemonFetcher";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";

import PokemonTextSearch from "./pokemon/PokemonTextSearch";
import OverlayLoading from "./OverlayLoading";
import TypeSelect from "./pokemon/PokemonSelectType";

import { Button } from "@/components/ui/button";

import type { RootState } from "../reduxStore";

import {
  setSelectedType,
  setTextSearch,
  clearFilters,
} from "../store/pokemonSlice";

export default function PokemonSearchFilters() {
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
    getPokemonTypes()
      .then((response) => {
        setLoading(true);
        setPokemonTypes(response.results.map((t) => t.name));
      })
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
          <TypeSelect
            types={pokemonTypes}
            value={selectedType}
            onChange={handleTypeChange}
          />

          <Button
            onClick={() => {
              dispatch(clearFilters());
            }}
            className="w-30 h-9.5 ml-2 justify-center text-white bg-white border border-gray-300 rounded-md text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Clear Filter
          </Button>
        </div>
      </div>
    </>
  );
}
