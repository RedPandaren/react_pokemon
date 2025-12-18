import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface PokemonCardProps {
  name: string;
  url: string;
  onSelect?: (name: string) => void;
}

export default function PokemonCard({ name, url, onSelect }: PokemonCardProps) {
  console.log("test" + url);
  return (
    <>
      <Card
        onClick={() => onSelect?.(name)}
        className="max-w-xs hover:shadow-lg  cursor-pointer transition-shadow rounded-2xl bg-blend-color burn p-4 border border-gray-200"
      >
        <CardHeader className="flex flex-col items-center ">
          <img alt={name} src={url} className="max-w-xs h-24 object-contain" />
          <CardContent className="mt-2">
            <div className="h-6 rounded w-3/4 animate-pulse">Pokemon</div>
          </CardContent>
          <CardTitle className="capitalize text-center">{name}</CardTitle>
        </CardHeader>
      </Card>
    </>
  );
}
