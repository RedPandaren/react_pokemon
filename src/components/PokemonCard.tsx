import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { myGlobalContext } from "@/GlobalContext";
import React, { useContext } from "react";
interface PokemonCardProps {
  name: string;
  url: string;
  onSelect?: (name: string) => void;
}

export default function PokemonCard({ name, url, onSelect }: PokemonCardProps) {
  // const { myState, myFunction } = useContext(myGlobalContext);

  return (
    <>
      <Card
        onClick={() => {
          onSelect?.(name);
        }}
        className="w-full h-48 hover:shadow-lg cursor-pointer transition-shadow rounded-2xl p-4 border border-gray-200"
      >
        <CardHeader className="flex flex-col items-center ">
          <img
            alt={name}
            src={
              url ||
              "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/10278.png"
            }
            className="max-w-xs h-auto w-auto object-contain"
            onError={(e) => {
              (e.target as HTMLImageElement).src =
                "https://www.svgrepo.com/show/276264/pokeball-pokemon.svg";
            }}
          />
          <CardContent className="mt-2">
            <div className="h-6 rounded w-3/4 animate-pulse">Pokemon</div>
          </CardContent>
          <CardTitle className="capitalize text-center">{name}</CardTitle>
        </CardHeader>
      </Card>
    </>
  );
}
