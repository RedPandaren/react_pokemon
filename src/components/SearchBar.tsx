import { getPokemonTypes, getPokemonList } from "../gateway/pokemonFetcher";
import { useEffect, useState } from "react";

import type { PokemonListItem } from "../gateway/pokemonFetcher";
import TypeSelect from "./PokemonSelectType";
import PokemonCard from "./PokemonList";

export function GetPokemonTypes() {
  const [pokemonTypes, setPokemonTypes] = useState<string[]>([]);
  const [selectedType, setSelectedType] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getPokemonTypes()
      .then((response) => setPokemonTypes(response.results.map((t) => t.name)))
      .catch((err) => {
        console.error(err);
        setError("Failed to fetch Pokémon types");
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="flex justify-end gap-4">
      <div className="flex items-center gap-4 mb-4">
        <div className="w-full max-w-xs">
          <TypeSelect
            types={pokemonTypes}
            value={selectedType}
            onChange={setSelectedType}
          />
        </div>
      </div>
      {/* <p>Selected Type: {selectedType}</p> */}
    </div>
  );
}

export function GetPokemonList() {
  const [offset, setOffset] = useState(0);
  const [pokemonList, setpokemonList] = useState<PokemonListItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getPokemonList(20, offset)
      .then((response) => {
        setpokemonList(response.results);
      })
      .catch((err) => {
        console.error(err);
        setError("Failed to load Pokémon list");
      })
      .finally(() => setLoading(false));
  }, [offset]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="items-center flex flex-col gap-4">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 w-275 items-center">
        {pokemonList.map((p) => (
          <PokemonCard key={p.name} name={p.name} />
        ))}
      </div>

      <button
        className="w-55 text-white"
        onClick={() => setOffset((prev) => prev + 20)}
      >
        Next
      </button>
      <button
        className="w-55 text-white"
        onClick={() => setOffset((prev) => prev - 20)}
      >
        Previos
      </button>
    </div>
  );
}
