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

interface SelectedPokemonCardProps {
  name: string;
  onClose: () => void;
}

interface PokemonSprites {
  front_default: string | null;
}

interface PokemonDetails {
  sprites: PokemonSprites;
}

export default function SelectedPokemonCard({
  name,
  onClose,
}: SelectedPokemonCardProps) {
  const [open, setOpen] = useState(false);
  const [pokemon, setPokemon] = useState<PokemonDetails | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!name) return;
    setOpen(true);
    setLoading(true);
    setError(null);

    getPokemonByNameOrId(name)
      .then((response) => {
        setPokemon(response);
      })
      .catch((err) => {
        console.error(err);
        setError("Failed to load Pokémon list");
      })
      .finally(() => setLoading(false));
  }, [name]);

  //   if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <>
      <Dialog
        open={open}
        onOpenChange={(isOpen) => {
          setOpen(isOpen);
          if (!isOpen) {
            onClose();
          }
        }}
      >
        <DialogContent className="max-w-md">
          {loading && <OverlayLoading isLoading={loading} />}

          {!loading && !error && (
            <>
              <DialogHeader className="flex text-center capitalize">
                <DialogTitle className="text-3xl">{name}</DialogTitle>
              </DialogHeader>
              <DialogDescription className="flex flex-col items-center justify-center gap-2 text-center">
                <img
                  className="w-220 h-90"
                  src={
                    pokemon?.sprites.front_default ??
                    "https://www.svgrepo.com/show/276264/pokeball-pokemon.svg"
                  }
                  alt={name}
                />
                POKEMON POKEMON JAMES TEST {name}.
              </DialogDescription>
              <DialogFooter>
                <DialogClose className="text-white">Close</DialogClose>
              </DialogFooter>
            </>
          )}

          {error && <p>{error}</p>}
        </DialogContent>
      </Dialog>
    </>
  );
}
