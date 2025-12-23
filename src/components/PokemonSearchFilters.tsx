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
import { useFetchQuery } from "@/gateway/QueryUtils";

export default function PokemonSearchFilters() {
  const { GetPokemonTypes } = useFetchQuery();
  const dispatch = useDispatch();

  const selectedType = useSelector(
    (state: RootState) => state.pokemon.selectedType
  );
  const textSearch = useSelector(
    (state: RootState) => state.pokemon.textSearch
  );

  const [pokemonTypes, setPokemonTypes] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);

  const handleTextSearchChange = (value: string) => {
    dispatch(setTextSearch(value));
  };

  const handleTypeChange = (value: string) => {
    dispatch(setSelectedType(value));
  };

  const { error: queryError, data, isError, isLoading } = GetPokemonTypes();

  useEffect(() => {
    if (isLoading) {
      return;
    }

    if (isError && queryError) {
      setError("Failed to fetch Pokémon types");
      // console.error(queryError);
      return;
    }

    if (data) {
      const types = data.results.map((type: { name: string }) => type.name);
      if (JSON.stringify(types) !== JSON.stringify(pokemonTypes)) {
        setPokemonTypes(types);
      }
    }
  }, [data, isError, queryError, isLoading, pokemonTypes]);

  if (isError) return <p>{error}</p>;

  if (isLoading) {
    return <OverlayLoading isLoading={true} />;
  }

  return (
    <>
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
