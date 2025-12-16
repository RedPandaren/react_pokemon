import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface PokemonCardProps {
  name: string;
}

export default function PokemonCard({ name }: PokemonCardProps) {
  return (
    <Card className="w-full max-w-xs hover:shadow-lg transition-shadow">
      <CardHeader className="flex flex-col items-center">
        <img
          alt={name}
          src="https://github.com/RedPandaren/TagordleGameProject/blob/main/75323238_433742510675114_5794918743624646656_n.jpg?raw=true"
          className="w-24 h-24 object-contain"
        />
        <CardTitle className="capitalize text-center">{name}</CardTitle>
      </CardHeader>
    </Card>
  );
}
