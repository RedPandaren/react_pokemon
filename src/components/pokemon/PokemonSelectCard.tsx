import { useEffect, useState } from "react";
import OverlayLoading from "../OverlayLoading";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useDispatch, useSelector } from "react-redux";
import { clearSelectedPokemon } from "@/store/pokemonSlice";
import { useFetchQuery } from "@/gateway/QueryUtils";
import type { RootState } from "@/reduxStore";

export default function SelectedPokemonCard() {
  const { GetPokemonByName } = useFetchQuery();

  const dispatch = useDispatch();
  const pokemon = useSelector(
    (state: RootState) => state.pokemon.selectedPokemon
  );

  const { data, error, isError, isLoading } = GetPokemonByName(pokemon?.name);

  useEffect(() => {
    if (!pokemon?.name) {
      return;
    }
  }, [data, pokemon]);

  if (isError && error) {
    return <p>An error occurred: {error.message}</p>;
  }

  if (isLoading) {
    return <OverlayLoading isLoading={true} />;
  }

  return (
    <>
      {pokemon && (
        <Dialog
          open={!!pokemon} // Open state now handled here
          onOpenChange={(isOpen) => {
            if (!isOpen) {
              dispatch(clearSelectedPokemon()); // Reset state in Redux when dialog closes
            }
          }}
        >
          <DialogContent className="max-w-md">
            <DialogHeader className="flex text-center capitalize">
              <DialogTitle className="text-3xl capitalize animate-pulse">
                {pokemon.name}
              </DialogTitle>
            </DialogHeader>
            <DialogDescription className="flex flex-col items-center justify-center gap-2 text-center">
              <img
                className="w-220 h-90"
                src={
                  data?.sprites.front_default ??
                  "https://www.svgrepo.com/show/276264/pokeball-pokemon.svg"
                }
                alt={pokemon.name ?? "Unknown Pokemon"}
              />
              <span>{pokemon.name}</span>
            </DialogDescription>
            <DialogFooter>
              <DialogClose className="text-white">Close</DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
}
