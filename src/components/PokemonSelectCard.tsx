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
  const [open, setOpen] = useState(false);
  const [pokemonDetails, setPokemonDetails] = useState<PokemonDetails | null>(
    null
  );
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const name = useSelector((state: RootState) => state.pokemon.selectedPokemon);

  useEffect(() => {
    if (!name) return;
    setOpen(true);
    setLoading(true);
    setError(null);

    getPokemonByNameOrId(name)
      .then((response) => {
        setPokemonDetails(response);
      })
      .catch((err) => {
        console.error(err);
        setError("Failed to load Pokemon Card");
      })
      .finally(() => setLoading(false));
  }, [name]);

  //   if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <>
      {name && (
        <Dialog
          open={open}
          onOpenChange={(isOpen) => {
            setOpen(isOpen);
            if (!isOpen) {
              dispatch(clearSelectedPokemon());
            }
          }}
        >
          <DialogContent className="max-w-md">
            {loading && <OverlayLoading isLoading={loading} />}

            {!loading && !error && (
              <>
                <DialogHeader className="flex text-center capitalize">
                  <DialogTitle className="text-3xl capitalize animate-pulse">
                    {name}
                  </DialogTitle>
                </DialogHeader>
                <DialogDescription className="flex flex-col items-center justify-center gap-2 text-center">
                  <img
                    className="w-220 h-90"
                    src={
                      pokemonDetails?.sprites.front_default ??
                      "https://www.svgrepo.com/show/276264/pokeball-pokemon.svg"
                    }
                    alt={name}
                  />
                  {name}.
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
