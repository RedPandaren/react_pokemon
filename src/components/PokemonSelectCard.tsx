import { useEffect, useState } from "react";
import OverlayLoading from "./OverlayLoading";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { getPokemonByNameOrId } from "../gateway/pokemonFetcher";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "@/reduxStore";
import { clearSelectedPokemon } from "@/store/pokemonSlice";

interface PokemonSprites {
  front_default: string | null;
}

interface PokemonDetails {
  sprites: PokemonSprites;
}

export default function SelectedPokemonCard() {
  const [pokemonDetails, setPokemonDetails] = useState<PokemonDetails | null>(
    null
  );
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const pokemon = useSelector(
    (state: RootState) => state.pokemon.selectedPokemon
  );
  console.log(pokemon);

  useEffect(() => {
    if (!pokemon || !pokemon.name) return;
    setLoading(true);
    setError(null);

    getPokemonByNameOrId(pokemon.name)
      .then((response) => {
        setPokemonDetails(response as PokemonDetails);
      })
      .catch((err) => {
        console.error(err);
        setError("Failed to load Pokemon Card");
      })
      .finally(() => setLoading(false));
  }, [pokemon]);

  if (error) return <p>{error}</p>;

  return (
    <>
      {pokemon && (
        <Dialog
          open={!!pokemon} // Open State Now Handled Here
          onOpenChange={(isOpen) => {
            if (!isOpen) {
              dispatch(clearSelectedPokemon()); // Reset state in Redux when dialog closes
            }
          }}
        >
          <DialogContent className="max-w-md">
            {loading && <OverlayLoading isLoading={loading} />}

            {!loading && !error && (
              <>
                <DialogHeader className="flex text-center capitalize">
                  <DialogTitle className="text-3xl capitalize animate-pulse">
                    {pokemon.name}
                  </DialogTitle>
                </DialogHeader>
                <DialogDescription className="flex flex-col items-center justify-center gap-2 text-center">
                  <img
                    className="w-220 h-90"
                    src={
                      pokemonDetails?.sprites.front_default ??
                      "https://www.svgrepo.com/show/276264/pokeball-pokemon.svg"
                    }
                    alt={pokemon.name ?? "Unknown Pokemon"}
                  />
                  {pokemon.name}.
                </DialogDescription>
                <DialogFooter>
                  <DialogClose className="text-white">Close</DialogClose>
                </DialogFooter>
              </>
            )}

            {error && <p>{error}</p>}
          </DialogContent>
        </Dialog>
      )}
    </>
  );
}
