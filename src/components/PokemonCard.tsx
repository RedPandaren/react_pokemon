import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { useState } from "react";
interface PokemonCardProps {
  name: string;
  url: string;
  onSelect?: (name: string) => void;
}

export default function PokemonCard({ name, url, onSelect }: PokemonCardProps) {
  const [imageError, setImageError] = useState(false);

  return (
    <Card
      onClick={() => {
        onSelect?.(name);
      }}
      className="w-full h-48 hover:shadow-lg cursor-pointer transition-shadow rounded-2xl p-4 border border-gray-200"
    >
      <CardHeader className="flex flex-col items-center">
        <img
          alt={name}
          src={
            imageError || !url
              ? "https://www.svgrepo.com/show/276264/pokeball-pokemon.svg"
              : url
          }
          className={`max-w-xs  object-contain transition-all duration-300 ${
            imageError ? "h-25 opacity-25" : "h-auto w-auto"
          }`}
          onError={() => setImageError(true)}
        />
        <CardContent className="mt-2">
          <div className="h-6 rounded w-3/4 animate-pulse">Pokemon</div>
        </CardContent>
        <CardTitle className="capitalize text-center">{name}</CardTitle>
      </CardHeader>
    </Card>
  );
}
