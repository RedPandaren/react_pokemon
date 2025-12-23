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

const { PAGE_SIZE } = POKEMON;

export default function PokemonList() {
  const dispatch = useDispatch();

  const selectedType = useSelector(
    (state: RootState) => state.pokemon.selectedType
  );

  const textSearch = useSelector(
    (state: RootState) => state.pokemon.textSearch
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

  useEffect(() => {
    const request = selectedType
      ? getPokemonByType(selectedType)
      : getPokemonList(1350, offset);

    startTransition(() => {
      request
        .then((response) => {
          setLoading(true);
          const list: PokemonListItem[] = selectedType
            ? (response as PokemonByTypeResponse).pokemon.map((p) => p.pokemon)
            : (response as unknown as PokemonNoFilterResponse).results; // convert to unknown first then to Another Type of Interface please code review consider this hehe

          setPokemonList(insertSpriteUrl(list));
        })
        .catch(() => {
          setError("Failed to load Pokémon list");
        })
        .finally(() => {
          setLoading(false);
        });
    });
  }, [selectedType, offset]);

  const filteredPokemon = useMemo(
    () =>
      textSearch && textSearch.trim() !== ""
        ? pokemonMatchCase(pokemonList, debouncedText)
        : pokemonList,
    [pokemonList, textSearch, debouncedText]
  );

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

        <SelectedPokemonCard />
      </div>

      <div className="flex justify-center">
        {pagedPokemon.length != 0 && (
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
