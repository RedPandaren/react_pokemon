import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface PokemonCardProps {
  name: string;
  onSelect?: (name: string) => void;
}

export default function PokemonCard({ name, onSelect }: PokemonCardProps) {
  return (
    <Card
      onClick={() => onSelect?.(name)}
      className="max-w-xs hover:shadow-lg  cursor-pointer transition-shadow rounded-2xl bg-blend-color burn p-4 border border-gray-200"
    >
      <CardHeader className="flex flex-col items-center ">
        <img
          alt={name}
          src="https://github.com/RedPandaren/TagordleGameProject/blob/main/75323238_433742510675114_5794918743624646656_n.jpg?raw=true"
          className="max-w-xs h-24 object-contain"
        />
        <CardContent className="mt-2">
          <div className="h-6 rounded w-3/4 animate-pulse">Pokemon</div>
        </CardContent>
        <CardTitle className="capitalize text-center">{name}</CardTitle>
      </CardHeader>
    </Card>
  );
}
