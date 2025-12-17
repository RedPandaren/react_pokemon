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

import { Button } from "@/components/ui/button";

import { getPokemonByNameOrId } from "../gateway/pokemonFetcher";

interface SelectedPokemonCardProps {
  name: string;
  onClose: () => void;
}

export default function SelectedPokemonCard({
  name,
  onClose,
}: SelectedPokemonCardProps) {
  const [open, setOpen] = useState(false);
  const [pokemon, setPokemon] = useState<unknown>(null);
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
              <DialogHeader>
                <DialogTitle>{name}</DialogTitle>
              </DialogHeader>
              <DialogDescription>
                <img
                  className="size-75 block justify-center"
                  src={(pokemon as any)?.sprites?.front_default}
                  alt={name}
                />
                POKEMON POKEMON JAMES TEST {name}.
              </DialogDescription>
              <DialogFooter>
                <DialogClose>
                  <Button variant="outline">Close</Button>
                </DialogClose>
              </DialogFooter>
            </>
          )}

          {error && <p>{error}</p>}
        </DialogContent>
      </Dialog>
    </>
  );
}
